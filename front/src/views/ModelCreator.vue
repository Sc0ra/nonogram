<template>
  <div>
    <h1 class="title is-1">
      Model Creator
    </h1>
    <div class="columns is-vcentered">
      <div class="column">
        <div class="left-column-content">
          <div class="file is-centered">
            <label class="file-label">
              <input
                ref="input"
                @change="setBaseImage"
                class="file-input"
                type="file"
                name="image"
                accept="image/*"
              >
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload" />
                </span>
                <span class="file-label">
                  Choose a file…
                </span>
              </span>
            </label>
          </div>
          <div>
            <vue-cropper
              ref="cropper"
              v-show="baseImageSource"
              :guides="true"
              :view-mode="0"
              :background="true"
              :src="baseImageSource"
              :aspect-ratio="1"
              class="nonogram-cropper"
              drag-mode="move"
              alt="Source Image"
            />
            <div
              v-if="!baseImageSource"
              class="placeholder"
            >
              Crop your model there
            </div>
          </div>
          <div>
            <button
              @click="cropImage"
              :disabled="!baseImageSource"
              class="button"
            >
              Crop
            </button>
          </div>
          <form class="form">
            <div class="field">
              <label class="label">Grid size</label>
              <div class="control slider-control">
                <vue-slider
                  v-model="size"
                  :min="5"
                  :max="30"
                  :interval="5"
                  tooltip="always"
                  tooltip-placement="bottom"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Number of colors</label>
              <div class="control slider-control">
                <vue-slider
                  v-model="colors"
                  :min="2"
                  :max="10"
                  tooltip="always"
                  tooltip-placement="bottom"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        v-if="model"
        class="column"
      >
        <creation-grid
          :model="model"
        />
      </div>
    </div>
    <canvas
      ref="canvas"
      class="invisible-canvas"
    />
  </div>
</template>

<script lang="ts">
import { Watch, Component, Vue } from 'vue-property-decorator';
import VueCropper from 'vue-cropperjs';
import Cropper from 'cropperjs';
import RgbQuant from 'rgbquant';
import 'cropperjs/dist/cropper.css';
import VueSlider from 'vue-slider-component';

import debounce from 'lodash/debounce';

import CreationGrid from '@/components/CreationGrid.vue';

interface Color {
  red?: number;
  green?: number;
  blue?: number;
}

@Component({
  name: 'ImagePixelator',
  components: {
    VueCropper,
    CreationGrid,
    VueSlider,
  },
})
export default class ImagePixelator extends Vue {
  $refs!: Vue['$refs'] & {
    cropper: Cropper;
    canvas: HTMLCanvasElement;
  }

  canvasSize = 400;

  model: Color[][] | null = null;

  size = 20;

  colors = 5;

  baseImageSource = '';

  image: HTMLImageElement = new Image();

  palette: Color[] | null = null;

  setBaseImage(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file && file.type.indexOf('image/') === -1) {
      return;
    }
    if (typeof FileReader === 'function') {
      const reader = new FileReader();
      reader.onload = () => {
        this.baseImageSource = reader.result as string;
        this.$refs.cropper.replace(this.baseImageSource);
      };
      reader.readAsDataURL(file);
    }
  }

  cropImage() {
    this.image = new Image();
    this.image.onload = () => {
      this.draw();
    };
    this.image.src = this.$refs.cropper.getCroppedCanvas().toDataURL();
  }

  @Watch('size')
  onSizeChange = debounce(() => {
    this.draw();
  }, 1000);

  @Watch('colors')
  onColorsChange = debounce(() => {
    this.draw();
  }, 1000);

  createPalette(rgbQuantPalette: Uint8Array) {
    const palette: Color[] = [];
    Array.from(rgbQuantPalette).reduce((acc, val, index) => {
      switch (index % 4) {
        case 0:
          acc.push({ red: val });
          break;
        case 1:
          acc[acc.length - 1].green = val;
          break;
        case 2:
          acc[acc.length - 1].blue = val;
          break;
        default:
          break;
      }
      return acc;
    }, palette);
    this.palette = palette;
  }

  createModel(flatModel: Uint8ClampedArray) {
    this.model = [...Array(this.size)].map((_, i) => [...Array(this.size)].map((_2, j) => {
      const baseIndex = (i * this.size + j) * 4;
      return flatModel[baseIndex + 3] === 255
        ? {
          red: flatModel[baseIndex],
          green: flatModel[baseIndex + 1],
          blue: flatModel[baseIndex + 2],
        }
        : { red: 255, green: 255, blue: 255 };
    }));
  }

  async draw() {
    if (this.image.src) {
      // Init context
      const { canvas } = this.$refs;
      const context = canvas && canvas.getContext('2d');
      if (context) {
        // Clear and init quantizer
        context.clearRect(0, 0, 400, 400);
        context.imageSmoothingEnabled = false;
        const q = new RgbQuant({
          colors: this.colors,
          dithDelta: 0.25,
        });
        // Color quantization
        q.sample(this.image);
        this.createPalette(q.palette());
        const out = q.reduce(this.image);
        // Image resizing and centering
        const clampedArray = new Uint8ClampedArray(out);
        const imageData = new ImageData(clampedArray, this.image.width, this.image.height);
        const image = await createImageBitmap(imageData);
        let { height, width } = image;
        if (width > this.size) {
          const ratio = this.size / width;
          width *= ratio;
          height *= ratio;
        }
        if (height > this.size) {
          const ratio = this.size / height;
          width *= ratio;
          height *= ratio;
        }
        context.drawImage(image, this.size / 2 - width / 2,
          this.size / 2 - height / 2, width, height);
        // Model genenration
        const flatModel = context.getImageData(0, 0, this.size, this.size).data;
        this.createModel(flatModel);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  max-width: 20rem;
  margin: auto;
  margin-top: 2rem;
}
.columns {
  margin-top: 2rem;
  margin: auto;
}
.nonogram-cropper {
  width: 400px;
  height: 400px;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
  width: 400px;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.left-column-content {
  max-width: 400px;
  margin: auto;
}
.slider-control {
  margin-bottom: 3rem;
}
.invisible-canvas {
  opacity: 0;
  position: fixed;
  bottom: -1000px;
}
</style>
