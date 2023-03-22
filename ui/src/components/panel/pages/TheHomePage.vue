<script setup lang="ts">
import { NButton, NScrollbar, NCode } from "naive-ui";
import { ref } from "vue";
import TheHeader from '@/components/panel/TheHeader.vue';
import { useMainStore } from '@/stores/main';
import { storeToRefs } from "pinia";
import ProcedureComponent from '@/components/panel/ProcedureComponent.vue';
import ProcedureInterruptStep from '@/components/panel/ProcedureInterruptStep.vue';
import ProcedurePreparationStep from '@/components/panel/ProcedurePreparationStep.vue';
import ProcedureChecklist from '@/components/panel/ProcedureChecklist.vue';
import CodeSlide from '@/components/panel/slides/CodeSlide.vue';
import GlobeSlide from '@/components/panel/slides/GlobeSlide.vue';
import EmbedSlide from '@/components/panel/slides/EmbedSlide.vue';
import PhotoSlide from '@/components/panel/slides/PhotoSlide.vue';
import { EmbedMode } from '@/components/panel/slides/EmbedSlide.vue';
import { PhCode } from "@phosphor-icons/vue";
import { PhPlanet } from "@phosphor-icons/vue";
import { PhCar } from "@phosphor-icons/vue";
import { PhAirplaneTilt } from "@phosphor-icons/vue";
import Falcon9 from '@/assets/f9.jpg';
import dragon from '@/assets/dragon.jpg';
import starship1 from '@/assets/starship-1.jpg';
import dragonRender from '@/assets/dragon-render.jpg';
import engines from '@/assets/engines.jpg';
import starshipRender from '@/assets/starship-render.jpg';
import f1_1 from '@/assets/1.png';
import f1_2 from '@/assets/2.png';
import f1_3 from '@/assets/3.png';
import f1_4 from '@/assets/4.png';
import f1_5 from '@/assets/5.png';
import f1_6 from '@/assets/6.png';
import plane1 from '@/assets/plane1.png';
import plane2 from '@/assets/plane2.png';
import poland737 from '@/assets/737-pl.jpg';
import crash from '@/assets/crash.png';
import drgDisplays1 from '@/assets/drg-displays-1.png';
import drgDisplays2 from '@/assets/drg-displays-2.jpg';
import drgCrew from '@/assets/drg-crew.jpg';

const counterProcedureTime = ref(0);

const procedureTime = ref();

const changeProcedureTime = () => {
  counterProcedureTime.value++;
  let hour, min, sec;
  if (Math.floor(counterProcedureTime.value / 3600) < 10) {
    hour = `0${Math.floor(counterProcedureTime.value / 3600)}`;
  } else {
    hour = Math.floor(counterProcedureTime.value / 3600);
  }
  if (Math.floor((counterProcedureTime.value % 3600) / 60) < 10) {
    min = `0${Math.floor((counterProcedureTime.value % 3600) / 60)}`;
  } else {
    min = Math.floor((counterProcedureTime.value % 3600) / 60);
  }
  if (counterProcedureTime.value % 60 < 10) {
    sec = `0${counterProcedureTime.value % 60}`;
  } else {
    sec = counterProcedureTime.value % 60;
  }
  procedureTime.value = (`${hour}:${min}:${sec}`);
};

changeProcedureTime();

setInterval(changeProcedureTime, 1000);

const mainStore = useMainStore();

const { uiState } = storeToRefs(mainStore);

const ui = {
  'spacex': {
    procedures: [
      {
        name: 'Deport & Burn',
        steps: {
          interrupt: {
            name: 'Wow, so empty',
            steps: []
          },
          preparation: {
            name: 'We will all go together when we go',
            steps: [],
          },
        },
        feature: {
          currentSlide: 0,
          slides: [],
        },
      },
      {
        name: 'Coast to Trunk Jettison',
        steps: {
          interrupt: {
            name: 'crew interrupt conditions',
            steps: [
              {
                name: '30° sustained altitude error',
                value: 'FAR FIELD POINTING',
              },
              {
                name: '600°/m altitude rate',
                value: 'FAR FIELD POINTING',
              },
            ]
          },
          preparation: {
            name: 'Crew Deorbit Preparations',
            steps: [
              {
                name: 'Deorbit burn - 3hrs',
                value: 'On SpaceX, On, Begin Procedure 4.700',
              },
              {
                name: 'NLT Deorbit Burn - 1hr',
                value: 'Deorbit Burn Brief',
              },
              {
                name: 'NLT Deorbit Burn - 30min',
                value: 'Review Reference Content',
              },
              {
                name: 'Deorbit, entry and landing Go/No-Go',
                value: 'Acknowledge',
              },
            ]
          },
          checklist: [
            {
              name: 'Monitor slow to free-flight altitude (Sun+GEO pointing)',
            },
            {
              name: 'After SpaceX GO for deorbit, verify entry is enabled:',
              entry: {
                name: 'ENTRY ENABLED',
                correctValue: 'True',
                currentValue: 'False',
              }
            },
            {
              name: 'After entry is enabled, Dragon transitions to Claw',
            }
          ]
        },
        feature: {
          currentSlide: 0,
          slides: [
            {
              slide: GlobeSlide,
            }
          ],
        },
      },
      {
        name: 'Claw Seperation',
        steps: {
          interrupt: {
            name: 'Wow, so empty',
            steps: []
          },
          preparation: {
            name: 'We will all go together when we go',
            steps: [],
          },
        },
        feature: {
          currentSlide: 0,
          slides: [],
        },
      },
      {
        name: 'Procedure',
        steps: {
          interrupt: {
            name: 'Wow, so empty',
            steps: []
          },
          preparation: {
            name: 'We will all go together when we go',
            steps: [],
          },
        },
        feature: {
          currentSlide: 0,
          slides: [],
        },
      },
      {
        name: 'Manual Chute Deployment',
        steps: {
          interrupt: {
            name: 'Wow, so empty',
            steps: []
          },
          preparation: {
            name: 'We will all go together when we go',
            steps: [],
          },
        },
        feature: {
          currentSlide: 0,
          slides: [],
        },
      },
    ],
  },
  'bisagex': {
    procedures: [
      {
        name: 'Kodzik',
        icon: PhCode,
        steps: {
          interrupt: {
            name: 'Projekty',
            steps: [
              {
                name: 'Zołza Hairstyles',
                value: 'W trakcie',
              },
              {
                name: 'Dripsiaga',
                value: 'Brak kodziku',
              },
              {
                name: 'Dripsiaga Rozkład Jazdy',
                value: 'Ukończono',
              },
              {
                name: 'Zacznij od wody',
                value: 'Ukończono',
              },
            ]
          },
          preparation: {
            name: 'Zołza Hairstyles',
            steps: [
              {
                name: 'Feat: Filtrowanie wizyt',
                value: '22.03.2022',
              },
              {
                name: 'Feat: Zmiana godzin pracy',
                value: '26.03.2022',
              },
              {
                name: 'Fix: Powiadomienia dla administratorów',
                value: '01.04.2022',
              },
              {
                name: 'Refactor: Pobieranie umówionych wizyt',
                value: '20.04.2022',
              },
            ],
          },
          checklist: [
            {
              name: 'Projekt: Zołza Hairstyles',
            },
            {
              name: '20.03.2022',
              entry: {
                name: 'Filtrowanie wizyt',
                correctValue: 'Zaimplementowano',
                currentValue: 'Brak',
              }
            },
            {
              name: 'Wykonać testy jednostkowe',
            }
          ]
        },
        feature: {
          currentSlide: 0,
          slides: [
            {
              slide: CodeSlide,
            },
            {
              slide: EmbedSlide,
              props: {
                address: 'https://mephew-case-converter.netlify.app/',
              }
            },
            {
              slide: EmbedSlide,
              props: {
                address: 'https://mephew-to-do-list.netlify.app/',
              }
            },
            {
              slide: EmbedSlide,
              props: {
                address: 'https://mephew-flashcards.netlify.app/',
              }
            },
            {
              slide: EmbedSlide,
              props: {
                address: 'https://mephew-witryny-data.netlify.app/',
              }
            },
            {
              slide: EmbedSlide,
              props: {
                address: 'https://dripsiaga.pl/quotes',
              }
            },
            {
              slide: EmbedSlide,
              props: {
                address: 'https://dripsiaga.pl/',
              }
            },
            {
              slide: EmbedSlide,
              props: {
                address: 'https://timetable.dripsiaga.pl/',
              }
            },
            {
              slide: EmbedSlide,
              props: {
                address: 'https://zolza-hairstyles.pl/',
              }
            },
          ],
        },
      },
      {
        name: 'Kosmos',
        icon: PhPlanet,
        steps: {
          interrupt: {
            name: 'Rakiety',
            steps: [
              {
                name: 'Falcon 9 Block 5',
                value: 'W użyciu',
              },
              {
                name: 'Falcon Heavy',
                value: 'W użyciu',
              },
              {
                name: 'Starship',
                value: 'W produkcji',
              }
            ]
          },
          preparation: {
            name: 'Nadchodzące starty',
            steps: [
              {
                name: 'Electron • “Stronger Together”',
                value: '16.03 23:00 (GMT+1)',
              },
              {
                name: 'Falcon 9 • Starlink 2-8',
                value: '17.03 20:15 (GMT+1)',
              },
              {
                name: 'Falcon 9 • SES 18 & SES 19',
                value: '17.03 23:00 (GMT+1)',
              },
              {
                name: 'Terran 1 • “Good Luck, Have Fun”',
                value: 'TBD 06:00 - 09:00 (GMT+1)',
              },
            ],
          },
        },
        feature: {
          currentSlide: 0,
          slides: [
            {
              slide: PhotoSlide,
              props: {
                photo: drgDisplays1,
              }
            },
            {
              slide: PhotoSlide,
              props: {
                photo: drgDisplays2,
              }
            },
            {
              slide: PhotoSlide,
              props: {
                photo: drgCrew,
              }
            },
            {
              slide: PhotoSlide,
              props: {
                photo: dragon,
              }
            },
            {
              slide: PhotoSlide,
              props: {
                photo: dragonRender,
              }
            },
            {
              slide: PhotoSlide,
              props: {
                photo: Falcon9,
              }
            },
            {
              slide: PhotoSlide,
              props: {
                photo: engines,
              }
            },
            {
              slide: PhotoSlide,
              props: {
                photo: starship1,
              }
            },
            {
              slide: PhotoSlide,
              props: {
                photo: starshipRender,
              }
            },
            {
              slide: EmbedSlide,
              props: {
                mode: EmbedMode.YT,
                ytVideoId: 'ODY6JWzS8WU',
                ytVideoStart: 697,
              }
            },
          ],
        },
      },
      {
        name: 'F1',
        icon: PhCar,
        steps: {
          interrupt: {
            name: 'Current Configuration',
            steps: [
              {
                name: 'Mode push',
                value: 'Engaged',
              },
              {
                name: 'Engage clutch pedal',
                value: 'Ok',
              },
              {
                name: 'Maintain optimal RPM',
                value: 'Optimal',
              },
              {
                name: 'ERS',
                value: 'Overtake',
              },
              {
                name: 'DRS',
                value: 'Disabled',
              },
            ]
          },
          preparation: {
            name: 'Your result',
            steps: [
              {
                name: 'You',
                value: 'P13',
              }
            ],
          },
          checklist: [
            {
              name: 'Jeddah, Saudi Arabia',
            },
            {
              name: 'Max Verstappen [P1]',
              entry: {
                name: '35.224',
                correctValue: '29.119',
                currentValue: '28.552',
              }
            },
            {
              name: 'Charles Leclerc [P2]',
              entry: {
                name: '34.481',
                correctValue: '30.642',
                currentValue: '31.957',
              }
            },
            {
              name: 'Levis Hamilton [P3]',
              entry: {
                name: '36.525',
                correctValue: '30.512',
                currentValue: '29.405',
              }
            },
          ]
        },
        feature: {
          currentSlide: 0,
          slides: [
            {
              slide: PhotoSlide,
              props: {
                photo: f1_1,
              }
            },
            {
              slide: PhotoSlide,
              props: {
                photo: f1_2,
              }
            },
            {
              slide: PhotoSlide,
              props: {
                photo: f1_3,
              }
            },
            {
              slide: PhotoSlide,
              props: {
                photo: f1_4,
              }
            },
            {
              slide: PhotoSlide,
              props: {
                photo: f1_5,
              }
            },
            {
              slide: PhotoSlide,
              props: {
                photo: f1_6,
              }
            },
            {
              slide: EmbedSlide,
              props: {
                ytVideoId: 'er4Ki8I6Drk',
                mode: EmbedMode.YT,
              }
            },
            {
              slide: EmbedSlide,
              props: {
                ytVideoId: 'gCivN-b4FZI',
                mode: EmbedMode.YT,
              }
            },
            {
              slide: EmbedSlide,
              props: {
                ytVideoId: 'IYndqz5i7mk',
                mode: EmbedMode.YT,
              }
            },
            {
              slide: EmbedSlide,
              props: {
                ytVideoId: 'pIrHA0yttBQ',
                mode: EmbedMode.YT,
              }
            },
          ],
        },
      },
      {
        name: 'Lotnictwo',
        icon: PhAirplaneTilt,
        steps: {
          interrupt: {
            name: 'Samoloty',
            steps: [
              {
                name: 'B737-800X',
                value: 'In Flight, POSITION: LAT: 26°15.00°N, LONG: 26°15.00°N',
              },
              {
                name: 'A320-251N',
                value: 'EPWA, Warsaw Chopin Airport',
              },
            ]
          },
          preparation: {
            name: 'Ciekawe lotniska',
            steps: [
              {
                name: 'Santa Cruz, Madera, Portugalia',
                value: 'LPMA',
              },
              {
                name: 'Jeju, Korea Południowa',
                value: 'RKPC',
              },
              {
                name: 'Londyn, Wielka Brytania',
                value: 'EGLL',
              },
              {
                name: 'Changi, Singapur',
                value: 'WSSS',
              },
            ],
          },
          checklist: [
            {
              name: 'Complete Preflight Checklist',
            },
            {
              name: 'Verify set',
              entry: {
                name: 'Parking brake',
                correctValue: 'SET',
                currentValue: 'unknown',
              }
            },
            {
              name: 'Verify on',
              entry: {
                name: 'Battery switch',
                correctValue: 'on',
                currentValue: 'off',
              }
            },
            {
              name: 'Verify on',
              entry: {
                name: 'Electric hydraulic pomps',
                correctValue: 'on',
                currentValue: 'unknown',
              }
            },
            {
              name: 'Verify connected / on',
              entry: {
                name: 'Ground power',
                correctValue: 'connect / on',
                currentValue: 'connected',
              }
            },
            {
              name: 'Verify down',
              entry: {
                name: 'Landing gear lever',
                correctValue: 'down',
                currentValue: 'unknown',
              }
            },
          ]
        },
        feature: {
          currentSlide: 0,
          slides: [
            {
              slide: PhotoSlide,
              props: {
                photo: plane2,
              }
            },
            {
              slide: PhotoSlide,
              props: {
                photo: poland737,
              }
            },
            {
              slide: PhotoSlide,
              props: {
                photo: crash,
              }
            },
            {
              slide: PhotoSlide,
              props: {
                photo: plane1,
              }
            },
            {
              slide: EmbedSlide,
              props: {
                ytVideoId: 'ezLtRjSLpys',
                mode: EmbedMode.YT,
              }
            },
            {
              slide: EmbedSlide,
              props: {
                ytVideoId: 'peY_a79liFo',
                mode: EmbedMode.YT,
              }
            },
          ],
        },
      },
    ],
  }
};

const currentProcedure = ref({
  'spacex': 1,
  'bisagex': 0,
});

const updateProcedure = (index: Number) => {
  // @ts-expect-error
  currentProcedure.value[uiState.value] = index;
}

const previousStep = () => {
  // @ts-expect-error
  if (currentProcedure.value[uiState.value] > 0) {
    // @ts-expect-error
    currentProcedure.value[uiState.value]--;
  }
}

const nextStep = () => {
  // @ts-expect-error
  if (currentProcedure.value[uiState.value] < ui[uiState.value].procedures.length - 1) {
    // @ts-expect-error
    currentProcedure.value[uiState.value]++;
  }
}

const previousSlide = () => {
  // @ts-expect-error
  if (ui[uiState.value].procedures[currentProcedure.value[uiState.value]].feature.currentSlide > 0) {
    // @ts-expect-error
    ui[uiState.value].procedures[currentProcedure.value[uiState.value]].feature.currentSlide--;
  }
}

const nextSlide = () => {
  // @ts-expect-error
  if (ui[uiState.value].procedures[currentProcedure.value[uiState.value]].feature.currentSlide < ui[uiState.value].procedures[currentProcedure.value[uiState.value]].feature.slides.length - 1) {
    // @ts-expect-error
    ui[uiState.value].procedures[currentProcedure.value[uiState.value]].feature.currentSlide++;
  }
}

</script>

<template>
  <div class="home-page">
    <TheHeader />
    <div class="procedures">
      <template v-for="procedure, index in ui[uiState].procedures" :key="procedure.name">
        <ProcedureComponent :current="index === currentProcedure[uiState]"
          @click="updateProcedure(index)">
          {{ procedure.name }}

          <template #icon v-if="procedure.icon">
            <component :is="procedure.icon" v-bind="{ size: 26 }" />
          </template>
        </ProcedureComponent>
      </template>
    </div>

    <div class="current-procedure">
      <div class="procedure-header">
        <div class="step-buttons">
          <NButton class="previous-step" ghost color="white" @click="previousStep">
            <svg width="16" height="16" viewBox="0 0 32 33" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M32 14.2646H7.66L18.84 3.08465L16 0.264648L0 16.2646L16 32.2646L18.82 29.4446L7.66 18.2646H32V14.2646Z"
                fill="white" />
            </svg>
          </NButton>
          <NButton class="next-step" ghost color="white" @click="nextStep">
            <svg width="16" height="16" viewBox="0 0 32 33" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.22392e-06 18.2646L24.34 18.2646L13.16 29.4446L16 32.2646L32 16.2646L16 0.264647L13.18 3.08465L24.34 14.2646L1.57361e-06 14.2646L1.22392e-06 18.2646Z"
                fill="white" />
            </svg>
          </NButton>
        </div>
        <h1 class="procedure-name">{{ ui[uiState].procedures[currentProcedure[uiState]].name }}</h1>
        <div class="procedure-state-container">
          <div class="title-container">
            <p class="procedure-state">running</p>
            <svg class="procedure-state-icon" width="17" height="23" viewBox="0 0 34 29" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.692 5.58057L18.5334 5.85505L18.2363 5.74428C13.9176 4.13372 8.92907 5.81881 6.54799 9.93822C3.89259 14.5322 5.47044 20.4326 10.0644 23.088C14.6585 25.7434 20.5588 24.1655 23.2142 19.5715L24.5727 17.2212L20.6974 18.2575L20.3352 18.3544L20.2383 17.9921L19.3773 14.7724L19.2804 14.4102L19.6427 14.3133L29.8892 11.5732L30.2515 11.4763L30.3484 11.8386L33.0885 22.0851L33.1854 22.4474L32.8231 22.5443L29.6034 23.4053L29.2411 23.5022L29.1443 23.1399L28.108 19.2646L26.7494 21.6149C24.93 24.7626 21.9347 27.0586 18.4225 27.9979C14.9102 28.9371 11.1687 28.4426 8.02102 26.6232C4.87334 24.8038 2.57733 21.8085 1.6381 18.2963C0.698861 14.784 1.19333 11.0425 3.01274 7.89479C6.51177 1.84124 13.9238 -0.5202 20.1982 2.13273L20.5893 2.29812L20.3768 2.66579L18.692 5.58057Z"
                fill="white" stroke="white" stroke-width="0.75" />
            </svg>
          </div>
          <p class="procedure-time">
            {{ procedureTime }}
          </p>
        </div>
      </div>
      <div class="procedure-steps">
        <NScrollbar>
          <ProcedureInterruptStep
            :steps="ui[uiState].procedures[currentProcedure[uiState]].steps.interrupt.steps"
            :name="ui[uiState].procedures[currentProcedure[uiState]].steps.interrupt.name" />

          <ProcedurePreparationStep
            :steps="ui[uiState].procedures[currentProcedure[uiState]].steps.preparation.steps"
            :name="ui[uiState].procedures[currentProcedure[uiState]].steps.preparation.name" />

          <ProcedureChecklist
            :steps="ui[uiState].procedures[currentProcedure[uiState]].steps.checklist"
            v-if="ui[uiState].procedures[currentProcedure[uiState]].steps.checklist" />
        </NScrollbar>
      </div>
    </div>

    <div class="feature">
      <component v-if="ui[uiState].procedures[currentProcedure[uiState]].feature.slides.length"
        :is="ui[uiState].procedures[currentProcedure[uiState]].feature.slides[ui[uiState].procedures[currentProcedure[uiState]].feature.currentSlide].slide"
        v-bind="ui[uiState].procedures[currentProcedure[uiState]].feature.slides[ui[uiState].procedures[currentProcedure[uiState]].feature.currentSlide].props" />
      <div class="under-slide-section"
        v-if="ui[uiState].procedures[currentProcedure[uiState]].feature.slides.length > 1">

        <div class="current-slide-container">
          <p class="current-slide">{{
            ui[uiState].procedures[currentProcedure[uiState]].feature.currentSlide + 1 }}
          </p>
          <span class="separator">&nbsp;/&nbsp;</span>
          <p class="slides-count">{{
            ui[uiState].procedures[currentProcedure[uiState]].feature.slides.length }}</p>
        </div>

        <div class="slide-controls">
          <NButton class="previous-slide" ghost color="white" @click="previousSlide"
            v-if="ui[uiState].procedures[currentProcedure[uiState]].feature.currentSlide > 0">
            <svg width="16" height="16" viewBox="0 0 32 33" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M32 14.2646H7.66L18.84 3.08465L16 0.264648L0 16.2646L16 32.2646L18.82 29.4446L7.66 18.2646H32V14.2646Z"
                fill="white" />
            </svg>
          </NButton>
          <NButton class="next-slide" ghost color="white" @click="nextSlide"
            v-if="ui[uiState].procedures[currentProcedure[uiState]].feature.currentSlide < ui[uiState].procedures[currentProcedure[uiState]].feature.slides.length - 1">
            <svg width="16" height="16" viewBox="0 0 32 33" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.22392e-06 18.2646L24.34 18.2646L13.16 29.4446L16 32.2646L32 16.2646L16 0.264647L13.18 3.08465L24.34 14.2646L1.57361e-06 14.2646L1.22392e-06 18.2646Z"
                fill="white" />
            </svg>
          </NButton>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss">
.n-button.camera-settings-btn {
  background-color: #111B52;

  span {
    text-transform: uppercase;
    font-weight: bold;
  }
}

.divider.n-divider--dashed .n-divider__line {
  border-color: white;
}

.n-scrollbar-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.n-scrollbar-rail__scrollbar {
  background-color: #5D68A4 !important;
}
</style>

<style scoped lang="scss">
.home-page {
  display: grid;
  grid-template-rows: 10vh auto;
  grid-template-columns: 1fr 6fr 10fr;
  justify-items: center;
  height: 95%;

  .slide-controls,
  .step-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;

    .previous-slide,
    .previous-step,
    .next-slide,
    .next-step {
      width: 50px;
      height: 50px;
      border-radius: .375rem;
      background-color: #111B52;
    }
  }
}

header {
  width: 100%;
  grid-column: 1/-1;
}

.procedures {
  border-right: 1px solid #adb0c2;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: .5rem 0;
}

.current-procedure {
  border-right: 1px solid #adb0c2;
  width: 100%;
  display: grid;
  grid-template-rows: 12vh 69vh;

  @media (min-height: 900px) {
    grid-template-rows: 13vh 71vh;
  }

  .procedure-header {
    display: flex;
    align-items: center;
    padding: 1rem;

    .procedure-name {
      font-size: 1.2rem;
      font-weight: bold;
      margin: 0 10% 0 5%;

      @media (min-width: 1920px) {
        font-size: 1.4rem;
      }
    }

    .procedure-state-container {
      display: flex;
      flex-direction: column;

      .title-container {
        display: flex;
        gap: .5rem;

        .procedure-state {
          text-transform: uppercase;
          font-weight: bold;
        }

        svg {
          cursor: pointer;
        }
      }
    }
  }

  .procedure-steps {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 0 1rem 1rem;
  }
}

.feature {
  display: grid;
  grid-template-rows: 90% 10%;
  width: 100%;

  .slide {
    max-height: 700px;
    padding: .5rem;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .under-slide-section {
    display: grid;
    grid-template-columns: 45% 55%;

    .current-slide-container {
      display: flex;
      align-items: center;
      justify-content: center;

      p,
      span {
        font-weight: bold;
        font-size: 1.2rem;
      }

      .current-slide {
        border-radius: .375rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .slide-controls {
      display: grid;
      grid-template-columns: 50px 50px 1fr;

      .previous-slide {
        grid-column: 1;
      }

      .next-slide {
        grid-column: 2;
      }
    }
  }
}
</style>
