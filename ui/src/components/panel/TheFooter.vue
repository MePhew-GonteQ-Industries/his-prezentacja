<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { NSwitch } from 'naive-ui';
import type { CSSProperties } from 'vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';

const route = useRoute();

const onHomePage = computed(() => route.name === 'home');

const railStyle = ({ focused, checked }: { focused: boolean; checked: boolean }): CSSProperties => {
  const style: CSSProperties = {};
  if (checked) {
    style.background = '#020738';
    if (focused) {
      style.boxShadow = '0 0 0 2px white';
    }
  } else {
    style.background = '#020738';
    if (focused) {
      style.boxShadow = '0 0 0 2px white';
    }
  }
  return style;
};

const mainStore = useMainStore();
const { uiState } = storeToRefs(mainStore);

const updateUiState = (value: boolean) => {
  if (value) {
    uiState.value = 'bisagex';
  } else {
    uiState.value = 'spacex';
  }
};
</script>

<template>
  <footer>
    <nav>
      <router-link :to="{ name: 'home' }">
        <svg
          width="40"
          height="40"
          viewBox="0 0 81 81"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.8161 68.7345C19.446 65.4656 14.3563 60.1548 11.361 53.6516C8.36565 47.1485 7.63779 39.8286 9.29381 32.8629C10.9498 25.8973 14.8941 19.6882 20.4956 15.2288C26.0972 10.7695 33.0324 8.31757 40.1921 8.26521C47.3517 8.21285 54.3221 10.5631 59.9883 14.94C65.6544 19.3169 69.6891 25.4677 71.4468 32.4084C73.2045 39.3491 72.5838 46.6788 69.6839 53.2251C66.784 59.7714 61.7725 65.156 55.451 68.5177L53.6848 65.1966C59.2633 62.23 63.6857 57.4783 66.2447 51.7016C68.8037 45.9248 69.3515 39.4567 67.8004 33.3318C66.2493 27.207 62.6889 21.7793 57.6888 17.9169C52.6886 14.0544 46.5376 11.9804 40.2196 12.0267C33.9015 12.0729 27.7815 14.2366 22.8384 18.1717C17.8953 22.1069 14.4147 27.5861 12.9534 33.733C11.492 39.8798 12.1343 46.3392 14.7775 52.078C17.4208 57.8167 21.9122 62.5032 27.5335 65.3879L25.8161 68.7345Z"
            fill="white"
          />
          <circle cx="54.4268" cy="67.2646" r="6" fill="white" />
          <circle cx="40.4268" cy="40.2646" r="18" fill="white" />
          <circle cx="22.4268" cy="16.2646" r="6" fill="white" />
        </svg>
      </router-link>
      <router-link :to="{ name: 'placeholder' }">
        <svg
          width="40"
          height="40"
          viewBox="0 0 81 81"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M72.4268 40.2646C72.4268 57.9378 58.0999 72.2646 40.4268 72.2646C22.7536 72.2646 8.42676 57.9378 8.42676 40.2646C8.42676 22.5915 22.7536 8.26465 40.4268 8.26465C58.0999 8.26465 72.4268 22.5915 72.4268 40.2646ZM12.5682 40.2646C12.5682 55.6505 25.0409 68.1232 40.4268 68.1232C55.8126 68.1232 68.2853 55.6505 68.2853 40.2646C68.2853 24.8788 55.8126 12.4061 40.4268 12.4061C25.0409 12.4061 12.5682 24.8788 12.5682 40.2646Z"
            fill="white"
          />
          <rect
            x="39.4268"
            y="17.2646"
            width="2"
            height="15"
            fill="white"
            stroke="white"
            stroke-width="2"
          />
          <rect
            x="39.4268"
            y="48.2646"
            width="2"
            height="15"
            fill="white"
            stroke="white"
            stroke-width="2"
          />
          <rect
            x="63.4268"
            y="39.2646"
            width="2"
            height="15"
            transform="rotate(90 63.4268 39.2646)"
            fill="white"
            stroke="white"
            stroke-width="2"
          />
          <rect
            x="32.4268"
            y="39.2646"
            width="2"
            height="15"
            transform="rotate(90 32.4268 39.2646)"
            fill="white"
            stroke="white"
            stroke-width="2"
          />
          <circle cx="40.4268" cy="40.2646" r="3" fill="white" />
        </svg>
      </router-link>
      <router-link :to="{ name: 'gameSpectator' }">
        <svg
          width="40"
          height="40"
          viewBox="0 0 81 81"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.0166 47.71C14.0166 30.8583 28.2002 10.6748 38.6015 10.6748C49.0027 10.6748 63.1863 30.8583 63.1863 47.71C63.1863 73.1837 61.702 70.8942 38.6015 70.8942C15.6336 70.8942 14.0166 72.8435 14.0166 47.71ZM24.2583 61.5265C25.2962 63.726 27.087 65.9354 29.5191 65.9349H47.6838C50.3531 65.9355 52.3892 63.6522 53.3465 61.1605C54.1999 58.9392 55.1511 56.2478 55.5053 54.4533C55.9408 52.2541 56.1621 49.9986 56.1621 47.71C56.1621 34.8924 46.6388 16.6033 38.6015 16.6033C30.5641 16.6033 21.0408 34.8924 21.0408 47.71C21.0408 49.9986 21.2621 52.2541 21.6976 54.4566C22.147 56.7335 23.2755 59.4438 24.2583 61.5265Z"
            fill="white"
          />
          <path
            d="M28.145 58.4659C34.606 70.4088 28.2732 66.825 24.8656 68.182C21.4579 69.539 17.4012 67.3891 15.8047 63.3801C14.2083 59.3711 15.6765 55.021 19.0842 53.664C22.4919 52.307 25.8817 54.2822 28.145 58.4659Z"
            fill="white"
          />
          <path
            d="M49.1353 58.4659C42.6743 70.4088 49.007 66.825 52.4147 68.182C55.8224 69.539 59.879 67.3891 61.4755 63.3801C63.072 59.3711 61.6037 55.021 58.1961 53.664C54.7884 52.307 51.3986 54.2822 49.1353 58.4659Z"
            fill="white"
          />
          <ellipse cx="38.6013" cy="36.4514" rx="6.34448" ry="5.94795" fill="white" />
        </svg>
      </router-link>
      <router-link :to="{ name: 'placeholder' }">
        <svg
          width="40"
          height="40"
          viewBox="0 0 81 81"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M41.2367 22.0411H73.5466C75.1396 22.0411 76.4266 23.3281 76.4266 24.9211V67.905C76.4266 69.498 75.1396 70.785 73.5466 70.785H7.30675C5.71376 70.785 4.42676 69.498 4.42676 67.905V14.6251C4.42676 13.0321 5.71376 11.7451 7.30675 11.7451H30.1847C30.3687 11.7467 30.5454 11.8174 30.6797 11.9431L41.2367 22.0411ZM40.4263 62.131C49.4838 62.131 56.8263 54.7885 56.8263 45.731C56.8263 36.6736 49.4838 29.3311 40.4263 29.3311C31.3689 29.3311 24.0264 36.6736 24.0264 45.731C24.0264 54.7885 31.3689 62.131 40.4263 62.131Z"
            fill="white"
          />
          <path
            d="M41.2928 58.7646C40.9079 59.4313 39.9456 59.4313 39.5607 58.7646L29.1684 40.7646C28.7835 40.098 29.2647 39.2646 30.0345 39.2646L50.8191 39.2647C51.5889 39.2647 52.07 40.098 51.6851 40.7647L41.2928 58.7646Z"
            fill="white"
          />
        </svg>
      </router-link>
      <router-link :to="{ name: 'settings' }">
        <svg
          width="40"
          height="40"
          viewBox="0 0 81 81"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.9"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M44.5088 8.07952C42.3425 5.65969 38.554 5.65969 36.3877 8.07952L31.79 13.2153C30.686 14.4485 29.0813 15.1132 27.4286 15.0218L20.546 14.6414C17.3031 14.4621 14.6242 17.141 14.8035 20.3839L15.184 27.2665C15.2753 28.9192 14.6106 30.5239 13.3774 31.6279L8.24162 36.2256C5.8218 38.3918 5.8218 42.1804 8.24163 44.3467L13.3774 48.9444C14.6106 50.0484 15.2753 51.6531 15.184 53.3058L14.8035 60.1884C14.6242 63.4313 17.3031 66.1102 20.546 65.9309L27.4286 65.5504C29.0813 65.4591 30.686 66.1237 31.79 67.357L36.3877 72.4928C38.554 74.9126 42.3425 74.9126 44.5088 72.4928L49.1065 67.357C50.2105 66.1237 51.8152 65.4591 53.4679 65.5504L60.3505 65.9309C63.5934 66.1102 66.2723 63.4313 66.093 60.1884L65.7125 53.3058C65.6212 51.6531 66.2859 50.0484 67.5191 48.9444L72.6549 44.3467C75.0747 42.1804 75.0747 38.3918 72.6549 36.2256L67.5191 31.6279C66.2859 30.5239 65.6212 28.9192 65.7125 27.2665L66.093 20.3839C66.2723 17.141 63.5934 14.4621 60.3505 14.6414L53.4679 15.0218C51.8152 15.1132 50.2105 14.4485 49.1065 13.2153L44.5088 8.07952ZM40.6147 64.1698C53.882 64.1698 64.6372 53.4146 64.6372 40.1474C64.6372 26.8801 53.882 16.1249 40.6147 16.1249C27.3475 16.1249 16.5922 26.8801 16.5922 40.1474C16.5922 53.4146 27.3475 64.1698 40.6147 64.1698Z"
            fill="white"
          />
          <path
            opacity="0.9"
            d="M39.2221 30.0426C40.0026 28.7706 41.8509 28.7706 42.6314 30.0426L52.5576 46.2186C53.3753 47.5512 52.4165 49.2646 50.853 49.2646H31.0006C29.4371 49.2646 28.4782 47.5512 29.2959 46.2186L39.2221 30.0426Z"
            fill="white"
          />
        </svg>
      </router-link>
    </nav>

    <div class="mission-state-container">
      <div class="current-state-container">
        <p class="state-title">current state</p>
        <p class="state-value">Far field pointing deorbit</p>
      </div>

      <div class="current-status-container">
        <n-switch
          :rail-style="railStyle"
          size="large"
          @update-value="updateUiState"
          class="switch-ui-state"
          v-if="onHomePage"
          :default-value="uiState !== 'spacex'"
        >
          <template #checked> BisageX </template>
          <template #unchecked> SpaceX </template>
        </n-switch>
        <p class="status-value" v-else>Trunk jettison and deorbit burn enabled</p>
      </div>

      <div class="pointing-mode-container">
        <p class="mode-title">pointing mode</p>
        <p class="mode-value">Sun+GEO</p>
      </div>
    </div>

    <div class="additional-data-container">
      <div class="data-1">
        <svg
          class="src-symbol active"
          width="30"
          height="30"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="25.9268"
            cy="25.7646"
            r="23.7414"
            stroke="currentColor"
            stroke-width="3.51724"
          />
          <path
            d="M22.5952 9.26514C14.6217 10.5299 8.52637 17.4356 8.52637 25.765C8.52637 34.0943 14.6217 41 22.5952 42.2648V38.6908C16.5749 37.4687 12.0436 32.146 12.0436 25.765C12.0436 19.3839 16.5749 14.0612 22.5952 12.8391V9.26514Z"
            fill="currentColor"
          />
          <path
            d="M29.2551 42.0571C37.2287 40.7924 43.3242 33.8867 43.3242 25.5573C43.3242 17.228 37.2288 10.3222 29.2551 9.05749L29.2551 12.6315C35.2756 13.8536 39.8069 19.1763 39.8069 25.5573C39.8069 31.9384 35.2756 37.2611 29.2551 38.4831L29.2551 42.0571Z"
            fill="currentColor"
          />
          <circle cx="25.9275" cy="25.7654" r="6.22729" fill="currentColor" />
        </svg>
        <p class="data-src active">spx</p>
        <div class="data-links active">
          <svg
            width="10"
            height="10"
            viewBox="0 0 15 12"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.7821 2.42004L10.9821 3.99782V1.82004C10.9821 1.58429 10.8884 1.3582 10.7217 1.1915C10.555 1.0248 10.329 0.931152 10.0932 0.931152H2.09321C1.62171 0.931152 1.16953 1.11845 0.836129 1.45185C0.502731 1.78525 0.31543 2.23743 0.31543 2.70893V9.82004C0.31543 10.2915 0.502731 10.7437 0.836129 11.0771C1.16953 11.4105 1.62171 11.5978 2.09321 11.5978H10.0932C10.329 11.5978 10.555 11.5042 10.7217 11.3375C10.8884 11.1708 10.9821 10.9447 10.9821 10.7089V8.52226L13.7821 10.1C13.8539 10.147 13.9369 10.1742 14.0225 10.1789C14.1082 10.1837 14.1936 10.1658 14.2702 10.127C14.3468 10.0883 14.4118 10.0301 14.4587 9.95825C14.5057 9.88642 14.5329 9.8035 14.5377 9.71782V2.79782C14.5322 2.71252 14.5044 2.63015 14.4572 2.55892C14.4099 2.48769 14.3449 2.43009 14.2684 2.39187C14.192 2.35364 14.1068 2.33613 14.0215 2.34107C13.9362 2.34602 13.8536 2.37324 13.7821 2.42004Z"
            />
          </svg>
          <svg
            width="10"
            height="10"
            viewBox="0 0 14 14"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.9267 1.26465V6.26465H13.4267C13.5255 6.26467 13.6222 6.29401 13.7044 6.34895C13.7866 6.40389 13.8507 6.48197 13.8885 6.57332C13.9263 6.66467 13.9362 6.76519 13.9169 6.86216C13.8977 6.95914 13.8501 7.04822 13.7802 7.11815L7.78015 13.1181C7.68639 13.2119 7.55923 13.2645 7.42665 13.2645C7.29407 13.2645 7.16692 13.2119 7.07315 13.1181L1.07315 7.11815C1.00325 7.04822 0.955643 6.95914 0.93636 6.86216C0.917076 6.76519 0.926977 6.66467 0.964812 6.57332C1.00265 6.48197 1.06672 6.40389 1.14892 6.34895C1.23113 6.29401 1.32778 6.26467 1.42665 6.26465H3.92665V1.26465C3.92692 0.999513 4.03236 0.745313 4.21984 0.557834C4.40732 0.370355 4.66152 0.264913 4.92665 0.264648H9.92665C10.1917 0.265045 10.4459 0.370529 10.6333 0.55798C10.8208 0.74543 10.9263 0.999554 10.9267 1.26465Z"
            />
          </svg>
        </div>
        <div class="conn-info">
          <span class="data-value">22:33</span>
          <div class="divider"></div>
          <span class="data-value">gnd</span>
        </div>

        <div class="conn-info">
          <span class="data-value">0.00</span>
          <div class="divider"></div>
          <span class="data-value">tdrs</span>
        </div>
      </div>

      <div class="data-2">
        <svg
          class="src-symbol"
          width="30"
          height="30"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="25.9268"
            cy="25.7646"
            r="23.7414"
            stroke="currentColor"
            stroke-width="3.51724"
          />
          <path
            d="M22.5952 9.26514C14.6217 10.5299 8.52637 17.4356 8.52637 25.765C8.52637 34.0943 14.6217 41 22.5952 42.2648V38.6908C16.5749 37.4687 12.0436 32.146 12.0436 25.765C12.0436 19.3839 16.5749 14.0612 22.5952 12.8391V9.26514Z"
            fill="currentColor"
          />
          <path
            d="M29.2551 42.0571C37.2287 40.7924 43.3242 33.8867 43.3242 25.5573C43.3242 17.228 37.2288 10.3222 29.2551 9.05749L29.2551 12.6315C35.2756 13.8536 39.8069 19.1763 39.8069 25.5573C39.8069 31.9384 35.2756 37.2611 29.2551 38.4831L29.2551 42.0571Z"
            fill="currentColor"
          />
          <circle cx="25.9275" cy="25.7654" r="6.22729" fill="currentColor" />
        </svg>
        <p class="data-src">iss</p>
        <div class="data-links">
          <svg
            width="10"
            height="10"
            viewBox="0 0 15 12"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.7821 2.42004L10.9821 3.99782V1.82004C10.9821 1.58429 10.8884 1.3582 10.7217 1.1915C10.555 1.0248 10.329 0.931152 10.0932 0.931152H2.09321C1.62171 0.931152 1.16953 1.11845 0.836129 1.45185C0.502731 1.78525 0.31543 2.23743 0.31543 2.70893V9.82004C0.31543 10.2915 0.502731 10.7437 0.836129 11.0771C1.16953 11.4105 1.62171 11.5978 2.09321 11.5978H10.0932C10.329 11.5978 10.555 11.5042 10.7217 11.3375C10.8884 11.1708 10.9821 10.9447 10.9821 10.7089V8.52226L13.7821 10.1C13.8539 10.147 13.9369 10.1742 14.0225 10.1789C14.1082 10.1837 14.1936 10.1658 14.2702 10.127C14.3468 10.0883 14.4118 10.0301 14.4587 9.95825C14.5057 9.88642 14.5329 9.8035 14.5377 9.71782V2.79782C14.5322 2.71252 14.5044 2.63015 14.4572 2.55892C14.4099 2.48769 14.3449 2.43009 14.2684 2.39187C14.192 2.35364 14.1068 2.33613 14.0215 2.34107C13.9362 2.34602 13.8536 2.37324 13.7821 2.42004Z"
            />
          </svg>
          <svg
            width="10"
            height="10"
            viewBox="0 0 14 14"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.9267 1.26465V6.26465H13.4267C13.5255 6.26467 13.6222 6.29401 13.7044 6.34895C13.7866 6.40389 13.8507 6.48197 13.8885 6.57332C13.9263 6.66467 13.9362 6.76519 13.9169 6.86216C13.8977 6.95914 13.8501 7.04822 13.7802 7.11815L7.78015 13.1181C7.68639 13.2119 7.55923 13.2645 7.42665 13.2645C7.29407 13.2645 7.16692 13.2119 7.07315 13.1181L1.07315 7.11815C1.00325 7.04822 0.955643 6.95914 0.93636 6.86216C0.917076 6.76519 0.926977 6.66467 0.964812 6.57332C1.00265 6.48197 1.06672 6.40389 1.14892 6.34895C1.23113 6.29401 1.32778 6.26467 1.42665 6.26465H3.92665V1.26465C3.92692 0.999513 4.03236 0.745313 4.21984 0.557834C4.40732 0.370355 4.66152 0.264913 4.92665 0.264648H9.92665C10.1917 0.265045 10.4459 0.370529 10.6333 0.55798C10.8208 0.74543 10.9263 0.999554 10.9267 1.26465Z"
            />
          </svg>
        </div>
      </div>

      <div class="data-3">
        <span class="data-time">79/1450122</span>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.switch-ui-state {
  div {
    font-weight: bold;
  }
}
</style>

<style scoped lang="scss">
footer {
  background-color: #111b52;
  display: flex;
  margin-bottom: 2px;
  display: grid;
  grid-template-columns: 27vw 46vw 27vw;

  @media (max-height: 800px) {
    border-bottom: 1px solid white;
  }

  nav {
    margin-left: 2rem;
    display: flex;
    align-items: flex-end;
    height: 100%;
    gap: 1rem;

    a {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border-bottom: 4px solid transparent;

      &.router-link-exact-active {
        border-color: white;
      }

      &:not(:first-child) {
        &.router-link-active {
          border-color: white;
        }
      }
    }
  }

  .mission-state-container {
    align-items: center;
    justify-content: center;
    display: grid;
    grid-template-columns: 20vw 15vw 20vw;

    .current-state-container {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      padding-right: 1rem;
      border-right: 1px solid white;
      text-align: center;

      .state-title {
        font-weight: bold;
        text-transform: uppercase;
        font-size: 0.8rem;
      }

      .state-value {
        text-transform: capitalize;
        font-weight: bold;
      }
    }

    .current-status-container {
      background-color: #445b94;
      margin: 0 0.5rem 0 0.5rem;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;

      .status-value {
        font-weight: bold;
        text-transform: capitalize;
        text-align: center;
        font-size: 0.7rem;
        max-width: 200px;
      }
    }

    .current-status-placeholder {
      margin: 0 0.5rem 0 0.5rem;
      padding: 0.5rem;
    }

    .pointing-mode-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 1rem;
      border-left: 1px solid white;

      .mode-title {
        font-weight: bold;
        text-transform: uppercase;
        font-size: 0.8rem;
      }

      .mode-value {
        text-transform: capitalize;
        font-weight: bold;
      }
    }
  }

  .additional-data-container {
    display: flex;
    gap: 2rem;

    * {
      font-weight: 600;
    }

    .data-src {
      text-transform: uppercase;
      color: #585d7c;

      &.active {
        color: #20fbfd;
      }
    }

    .src-symbol {
      color: #585d7c;

      &.active {
        color: #20fbfd;
      }
    }

    .data-links {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      svg path {
        fill: #585d7c;
      }

      &.active {
        svg path {
          fill: #20fbfd;
        }
      }
    }

    .data-1 {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .conn-info {
        display: flex;
        flex-direction: column;

        .divider {
          border-bottom: 1px solid #20fbfd;
        }

        .data-value {
          color: #20fbfd;
          text-align: center;
          text-transform: uppercase;
          font-size: 0.7rem;
        }
      }
    }

    .data-2,
    .data-3 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .data-3 {
      .data-time {
        color: #dddddd;
      }
    }
  }
}
</style>
