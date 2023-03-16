<script setup lang="ts">
const props = defineProps({
  name: String,
  steps: Array,
});
</script>

<template>
  <div class="procedure-step">
    <div class="step-header">
      <svg width="18" height="19" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M30.2662 27.7672C31.3179 28.5909 32.8544 28.4126 33.5298 27.26C34.8321 25.0376 35.6472 22.553 35.9084 19.9715C36.2511 16.5846 35.6263 13.1699 34.1066 10.1238C32.5869 7.07766 30.2345 4.52493 27.3225 2.7618C25.1029 1.41799 22.6277 0.574915 20.0689 0.278772C18.7418 0.125208 17.6753 1.24563 17.7009 2.58126C17.7265 3.91696 18.8386 4.95632 20.1565 5.17526C21.7982 5.4479 23.3807 6.03073 24.8168 6.90023C26.9462 8.18948 28.6663 10.0561 29.7776 12.2836C30.8889 14.511 31.3457 17.0079 31.0951 19.4845C30.9261 21.1548 30.44 22.7697 29.6705 24.2453C29.0529 25.4298 29.2144 26.9434 30.2662 27.7672Z"
          fill="#FFB74B" />
        <path
          d="M12.1191 3.73031C11.6148 2.49319 10.1925 1.88546 9.03403 2.55087C7.56657 3.39388 6.22175 4.44168 5.04154 5.6658C3.30015 7.47207 1.9556 9.6224 1.09418 11.9788C0.232765 14.3354 -0.126518 16.8458 0.0394056 19.3493C0.20536 21.8528 0.892799 24.294 2.05769 26.5161C3.22257 28.7382 4.83915 30.6923 6.80369 32.253C8.76823 33.8136 11.0373 34.9463 13.4654 35.5784C15.8934 36.2105 18.4268 36.328 20.9029 35.9233C22.5811 35.6491 24.2078 35.1391 25.7359 34.4118C26.9422 33.8377 27.2515 32.3221 26.5209 31.2036C25.7904 30.0852 24.2962 29.7945 23.0631 30.3083C22.1214 30.7007 21.1349 30.9834 20.1227 31.1488C18.3121 31.4447 16.4596 31.3587 14.6842 30.8966C12.9087 30.4344 11.2495 29.6061 9.8129 28.4649C8.37638 27.3238 7.19431 25.8949 6.34251 24.27C5.4907 22.645 4.98801 20.86 4.86668 19.0294C4.74534 17.1988 5.00806 15.363 5.63795 13.6399C6.26786 11.9168 7.25101 10.3444 8.52439 9.02358C9.23621 8.28524 10.0299 7.63467 10.8883 7.08346C12.0124 6.36166 12.6233 4.96743 12.1191 3.73031Z"
          fill="#FFB74B" />
        <path
          d="M18.4997 23.1586C21.5372 23.1586 23.9997 20.6961 23.9997 17.6586C23.9997 14.6211 21.5372 12.1586 18.4997 12.1586C15.4621 12.1586 12.9997 14.6211 12.9997 17.6586C12.9997 20.6961 15.4621 23.1586 18.4997 23.1586Z"
          fill="#FFB74B" />
      </svg>
      <p class="step-name">{{ props.name }}</p>
    </div>
    <template v-for="step in props.steps" :key="step">
      <div class="step">
        <p class="name">{{ step.name }}</p>
        <div class="divider"></div>
        <p class="value uppercase">{{ step.value }}</p>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.procedure-step {
  background-color: #111B52;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-right: 1rem;

  .step-header {
    display: flex;
    align-items: center;
    gap: .5rem;
    border-bottom: 1px solid white;
    padding: .5rem 0;

    .step-name {
      text-transform: capitalize;
      font-weight: bold;
    }
  }

  .step {
    display: flex;
    align-items: flex-end;
    width: 100%;

    .name {
      display: inline-flex;
    }

    .divider {
      border-bottom: 1px dashed white;
      display: inline-flex;
      flex-grow: 100;
      margin-bottom: 7px;
    }

    .value {
      display: inline-flex;
      font-weight: bold;
      text-transform: capitalize;

      &.uppercase {
        text-transform: uppercase;
      }
    }
  }

  ol {
    padding: 0 0 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    ::marker {
      font-weight: bold;
    }

    p {
      font-weight: bold;
    }

    li {
      .checklist-container {
        display: flex;
        border-width: 1px 0 1px 0;
        border-color: white;
        border-style: solid;
        margin-top: .5rem;
        padding: .5rem 15% .5rem 0;
        justify-content: space-between;

        .checklist-item {
          color: #C1C3DF;
          text-transform: uppercase;
        }

        .checklist-correct-value {
          color: #C1C3DF;
          text-transform: capitalize;
        }

        .checklist-current-value {
          text-transform: capitalize;
        }
      }
    }
  }
}
</style>
