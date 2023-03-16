<script setup lang="ts">
defineProps({
  steps: Array,
});
</script>

<template>
  <div class="procedure-step">
    <ol>
      <li v-for="step in steps" :key="step">
        <p>{{ step.name }}</p>
        <div class="checklist-container" v-if="step.entry">
          <p class="checklist-item">{{ step.entry.name }}</p>
          <p class="checklist-correct-value">{{ step.entry.correctValue }}</p>
          <p class="checklist-current-value">{{ step.entry.currentValue }}</p>
        </div>
      </li>
    </ol>
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
