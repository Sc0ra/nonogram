<template>
  <div>
    <h1 class="title is-1">
      Model Creator
    </h1>
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
    <div class="columns">
      <div class="column">
        <picture-input
          ref="pictureInput"
          @change="onChange"
          :crop="false"
          :custom-strings="{
            drag: 'Drag your picture here to use it as a model'
          }"
          width="400"
          height="400"
          accept="image/jpeg,image/png"
          size="10"
          button-class="button"
        />
      </div>
      <div
        v-show="source"
        class="column"
      >
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
import quantize from 'quantize';

@Component({
  name: 'ImagePixelator',
  components: {
    PictureInput,
  },
})
export default class ImagePixelator extends Vue {
  public size = 10;

  public colors = 5;

  public source = '';

  public onChange(image: string) {
    if (image) {
      this.source = image;
      this.draw(image);
    }
  }

  @Watch('size')
  public onSizeChange() {
    if (this.source) {
      this.draw(this.source);
    }
  }

  @Watch('colors')
  public onColorChange() {
    if (this.source) {
      this.draw(this.source);
    }
  }

  public draw(imageSource: string) {
    const canvas = this.$refs.canvas as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }
    const img = new Image();
    img.src = imageSource;
    context.imageSmoothingEnabled = false;
    let { height, width } = img;
    img.onload = () => {
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
      context.drawImage(img, this.size / 2 - width / 2,
        this.size / 2 - height / 2, width, height);
      const imgData = context.getImageData(0, 0, this.size, this.size);
      context.clearRect(0, 0, 400, 400);
      const accumulator: number[][] = [];
      const pixelArray = imgData.data.reduce((acc, cur, curIndex) => {
        if (curIndex % 4 === 0) {
          acc.push([cur]);
        } else if (curIndex % 4 === 1 || curIndex % 4 === 2) {
          acc[acc.length - 1].push(cur);
        }
        return acc;
      }, accumulator);
      const colorMap = quantize(pixelArray, this.colors);
      const pixelArrayQuant = pixelArray.map((val) => colorMap.map(val));
      const clampedArrayQuant = new Uint8ClampedArray(pixelArrayQuant
        .reduce(
          (acc, cur, curIndex) => [...acc, ...cur, imgData.data[(curIndex + 1) * 4 - 1]],
          [],
        ));

      const imageDataQuant = new ImageData(clampedArrayQuant, this.size, this.size);
      createImageBitmap(imageDataQuant).then((image) => {
        context.drawImage(image, 0, 0, 400, 400);
      });
      // const imgData = context.getImageData(0, 0, this.size, this.size);
      // const clampedArrayQuant = imgData.data
      //   .map((val) => Math.floor((val + 1) / 32) * (256 / 8) - 1);

      // const pixelArray = imgData.data.reduce((acc, cur, curIndex) => {
      //   if (curIndex % 4 === 0) {
      //     acc.push([Math.floor((cur + 1) / 16) * (256 / 16)]);
      //   } else if (curIndex % 4 === 1 || curIndex % 4 === 2) {
      //     acc[acc.length - 1].push(Math.floor((cur + 1) / 16) * (256 / 16));
      //   }
      //   return acc;
      // }, []);
      // const colorMap = quantize(pixelArray, this.colors);
      // const pixelArrayQuant = pixelArray.map((val) => colorMap.map(val));
      // const clampedArrayQuant = new Uint8ClampedArray(pixelArrayQuant
      //   .reduce((acc, cur) => [...acc, ...cur, 255], []));

      // const imageDataQuant = new ImageData(clampedArrayQuant, this.size, this.size);

      // createImageBitmap(imageDataQuant).then((imgQuant) => {
      //   context.drawImage(imgQuant, 0, 0, this.size, this.size, 0, 0, 400, 400);
      // });
    };
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
</style>
