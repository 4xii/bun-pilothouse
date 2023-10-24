<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from 'vue';

interface BtnConfig {
  label: string;
  value: any;
}

const props = defineProps<{
  btnList: BtnConfig[];
  modelValue: any;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
  (e: 'tabClick', value: any): void;
}>();

const { btnList } = props;

const contentPaddingLeft = 16;
const btnMarginLeftRight = 8;
let btnWidth = 0;

const contentRef = ref<HTMLDivElement | null>(null);
const activedBtnIndex = ref<any>(props.modelValue);

const onBtnClick = (index: number) => {
  const selectedValue = props.btnList[index].value;
  if (contentRef.value && activedBtnIndex.value !== selectedValue) {
    const left = `${contentPaddingLeft +
      btnWidth * index +
      index * btnMarginLeftRight * 2
      }px`;
    contentRef.value.style.setProperty("--groove-left", left);

    let rotate = "0deg";
    if (index < activedBtnIndex.value) {
      rotate = "-15deg";
    } else {
      rotate = "15deg";
    }
    contentRef.value.style.setProperty("--wraper-rotate", rotate);
    window.setTimeout(() => {
      if (contentRef.value) {
        contentRef.value.style.setProperty("--wraper-rotate", "0deg");
      }
    }, 600);

    console.log('selectedValue :>> ', selectedValue);
    activedBtnIndex.value = selectedValue;
    emit('update:modelValue', selectedValue);
    emit('tabClick', selectedValue);
  }
};

onMounted(() => {
  if (contentRef.value) {
    const { width } = contentRef.value.getBoundingClientRect();
    btnWidth =
      (width -
        contentPaddingLeft * 2 -
        (props.btnList.length * 2 - 2) * btnMarginLeftRight) /
      props.btnList.length;
    contentRef.value.style.setProperty("--btnWidth", `${btnWidth}px`);
  }
})
</script>

<template>
  <div class="w-full">
    <div class="container">
      <ModuleTitle i18nTitle="page.htmlVision.interactiveDesign.swipeTab" />
      <div class="content" ref="contentRef">
        <div v-for="(btn, index) in btnList" :key="index" :className="`btn${activedBtnIndex === index ? ' actived' : ''}`"
          @click="() => onBtnClick(index)">
          {{ btn.label }}
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
  $contentPaddingTop: 20px;
  $contentPaddingLeft: 16px;
  $btnMarginLeftRight: 8px;

  .content {
    @property --groove-left {
      syntax: "<length>";
      initial-value: $contentPaddingLeft;
      inherits: false;
    }

    @property --wraper-rotate {
      syntax: "<angle>";
      initial-value: 0deg;
      inherits: false;
    }

    @property --btnWidth {
      syntax: "<length>";
      initial-value: 0px;
      inherits: false;
    }

    position: relative;
    width: 600px;
    height: 80px;
    padding: $contentPaddingTop $contentPaddingLeft;
    border-radius: 12px;
    overflow: hidden;
    background-color: #e2e6eb;
    box-shadow: -10px -10px 15px #343f49,
    10px 10px 15px #212d38;
    display: flex;
    justify-content: space-between;
    transform-origin: center; // 添加转换原点
    transition: transform 0.4s cubic-bezier(0, 0, 0.48, 1); // 添加过渡效果
    transform: rotateY(var(--wraper-rotate)); // 添加Y轴旋转

    &::before {
      content: "";
      position: absolute;
      left: var(--groove-left, $contentPaddingLeft);
      top: $contentPaddingTop;
      width: var(--btnWidth);
      height: calc(100% - ($contentPaddingTop * 2));
      border-radius: 12px;
      box-shadow: inset 8px 8px 6px #d9dce6, inset -5px -5px 15px #f5f9fd,
        inset -5px -5px 15px #f5f9fd, inset 7px 7px 6px #d9dce6;
      transition: left 0.8s cubic-bezier(0.82, 0.12, 0.18, 0.88); // 添加过渡效果，贝塞尔曲线
    }

    .btn {
      display: flex;
      width: var(--btnWidth);
      justify-content: center;
      align-items: center;
      font-size: 15px;
      font-weight: 600;
      color: #444;
      cursor: pointer;
      user-select: none;
      transition: color 1.2s linear 0.4s; // 添加文字颜色过渡效果
      animation: txtOutScale 0.6s linear; // 添加按钮未选中动画

      &:not(:first-child) {
        margin-left: $btnMarginLeftRight;
      }

      &:not(:last-child) {
        margin-right: $btnMarginLeftRight;
      }
    }

    .actived {
      color: #111 !important;
      transform: scale(1.1); // 修改选中状态原始缩放为1.1
      animation: txtEnterScale 1s linear; // 添加按钮选中动画
    }

    /* 按钮选中缩放动画 */
    @keyframes txtEnterScale {

      0%,
      30% {
        transform: scale(1);
      }

      80% {
        transform: scale(1.15);
      }

      100% {
        transform: scale(1.1);
      }
    }

    /* 按钮未选中缩放动画 */
    @keyframes txtOutScale {

      0%,
      30% {
        transform: scale(1.1);
      }

      80% {
        transform: scale(0.95);
      }

      100% {
        transform: scale(1);
      }
    }
  }

</style>
