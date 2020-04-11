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
        <canvas
          ref="canvas"
          width="400"
          height="400"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Watch, Component, Vue } from 'vue-property-decorator';
import PictureInput from 'vue-picture-input';
import VueCropper from 'vue-cropperjs';
import RgbQuant from 'rgbquant';
import 'cropperjs/dist/cropper.css';

@Component({
  name: 'ImagePixelator',
  components: {
    PictureInput,
    VueCropper,
  },
})
export default class ImagePixelator extends Vue {
  public canvasSize = 400;

  public size = 20;

  public colors = 5;

  public baseImageSource = '';

  public image: HTMLImageElement = new Image();

  public palette: Uint8Array[][] = [];

  get canvas() {
    return this.$refs.canvas as HTMLCanvasElement;
  }

  get context() {
    return this.canvas && this.canvas.getContext('2d');
  }

  public setBaseImage(e) {
    const file = e.target.files[0];
    if (file.type.indexOf('image/') === -1) {
      return;
    }
    if (typeof FileReader === 'function') {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.baseImageSource = event.target.result;
        this.$refs.cropper.replace(event.target.result);
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
    const canvas = this.$refs.canvas as HTMLCanvasElement;
    const context = canvas.getContext('2d');
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
      const imageData2 = new ImageData(
        context.getImageData(0, 0, this.size, this.size).data,
        this.size,
        this.size,
      );
      context.clearRect(0, 0, 400, 400);
      createImageBitmap(imageData2).then((image2) => {
        this.context.drawImage(
          image2, 0, 0, this.size, this.size, 0, 0, this.canvas.width, this.canvas.height,
        );
      });
    });
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
canvas {
  margin-top: 2rem;
  border: 2px solid #76bdb9;
  padding: 5px;
  border-radius: 5px;
  background-color: white;
}
.left-column-content {
  max-width: 400px;
  margin: auto;
}
</style>
