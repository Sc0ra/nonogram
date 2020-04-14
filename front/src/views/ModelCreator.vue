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
          </div>
          <div>
            <button
              @click="cropImage"
              v-if="baseImageSource"
              class="button"
            >
              Crop
            </button>
          </div>
        </div>
      </div>
      <div class="column">
        <form class="form">
          <div class="field">
            <label class="label">Grid size</label>
            <div class="control">
              <input
                v-model.number="size"
                class="input"
                type="number"
              >
            </div>
          </div>

          <div class="field">
            <label class="label">Number of colors</label>
            <div class="control">
              <input
                v-model.number="colors"
                class="input"
                type="number"
              >
            </div>
          </div>
        </form>
        <creation-grid
          v-if="model"
          :model="model"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Watch, Component, Vue } from 'vue-property-decorator';
import VueCropper from 'vue-cropperjs';
import Cropper from 'cropperjs';
import RgbQuant from 'rgbquant';
import 'cropperjs/dist/cropper.css';

import CreationGrid from '@/components/CreationGrid.vue';

interface Color {
  red: number;
  green: number;
  blue: number;
}

@Component({
  name: 'ImagePixelator',
  components: {
    VueCropper,
    CreationGrid,
  },
})
export default class ImagePixelator extends Vue {
  $refs!: Vue['$refs'] & {
    cropper: Cropper;
    canvas: HTMLCanvasElement;
  }

  public canvasSize = 400;

  public model: Color[][] | null = null;

  public size = 20;

  public colors = 5;

  public baseImageSource = '';

  public image: HTMLImageElement = new Image();

  public palette: Uint8Array[][] = [];

  public setBaseImage(event: Event) {
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

  public cropImage() {
    this.image = new Image();
    this.image.onload = () => {
      this.draw();
    };
    this.image.src = this.$refs.cropper.getCroppedCanvas().toDataURL();
  }

  @Watch('size')
  public onSizeChange() {
    if (this.image) {
      this.draw();
    }
  }

  @Watch('colors')
  public onColorsChange() {
    if (this.image) {
      this.draw();
    }
  }

  public draw() {
    const canvas = new OffscreenCanvas(this.size, this.size);
    const context = canvas && canvas.getContext('2d');
    if (context) {
      context.clearRect(0, 0, 400, 400);
      context.imageSmoothingEnabled = false;
      const q = new RgbQuant({
        colors: this.colors,
      });
      q.sample(this.image);
      const out = q.reduce(this.image);
      const clampedArray = new Uint8ClampedArray(out);
      const imageData = new ImageData(clampedArray, this.image.width, this.image.height);
      createImageBitmap(imageData).then((image) => {
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
        const flatModel = context.getImageData(0, 0, this.size, this.size).data;
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
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  max-width: 20rem;
  margin: auto;
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
.left-column-content {
  max-width: 400px;
  margin: auto;
}
</style>
