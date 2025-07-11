<template>
  <header class="flex p-6">
    <div class="header_wrap flex_col">
      <div class="header_cont flex">
        <!-- Logo -->
        <a href="/" class="header-logo"><h2>O/D</h2></a>
        <!-- Menu Toggle -->
        <div class="header-toggle">
          <label class="relative flex items-center justify-center p-4 pointer-events-auto cursor-pointer">
            <input
              type="checkbox"
              class="hidden"
              id="menu-toggle"
              v-model="isMenuOpen"
            />
            <span>
              <svg
                class="header-menu-icon"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="header-menu-path-1"
                  :class="{ 'rotate-45 translate-y-2': isMenuOpen }"
                  d="M0 8H32"
                  stroke="currentColor"
                  stroke-width="1.5"
                  vector-effect="non-scaling-stroke"
                  stroke-linecap="square"
                ></path>
                <path
                  class="header-menu-path-2"
                  :class="{ '-rotate-45 -translate-y-2': isMenuOpen }"
                  d="M0 16H32"
                  stroke="currentColor"
                  stroke-width="1.5"
                  vector-effect="non-scaling-stroke"
                  stroke-linecap="square"
                ></path>
              </svg>
            </span>
          </label>
        </div>

        <!-- Book a Call Button -->
        <!-- <div class="flex items-center gap-4">
          <a href="/bookacall" class="button-primary">
            <div class="flex">
              <span class="font-medium">Book a Call</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.33333 4L13.5 8L9.33333 12M13 8H2.5"
                  stroke="currentColor"
                  stroke-opacity="1"
                  stroke-width="1.5"
                  stroke-linecap="square"
                ></path>
              </svg>
            </div>
          </a>
        </div> -->
      </div>


      <!-- Navigation Menu -->
      <div class="header-menu" :class="{ 'menu-open': isMenuOpen }">
        <ul class="header-menu-list py-4 px-6">
          <li class="header-menu-item">
            <a
              class="text-2xl font-medium text-center"
              href="/#about"
              @click="closeMenu"
            >
              About me
            </a>
          </li>
          <li class="header-menu-item">
            <a
              class="text-2xl font-medium text-center"
              href="/#work"
              @click="closeMenu"
            >
              Projects
            </a>
          </li>
          <li class="header-menu-item">
            <a
              class="text-2xl font-medium text-center"
              href="/#pricing"
              @click="closeMenu"
            >
              Experience
            </a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<style scoped>


.header-menu {
  overflow: hidden;
  transition: all .3s ease-in-out;
  max-height: 0;
  opacity: 0;
}

.header-menu.menu-open {
  max-height: 300px;
  opacity: 1;
  border-top-width: 1px
}
.header-menu-icon {
  transition: all 2s;
}

.header-menu-path-1,
.header-menu-path-2 {
  transition: all 2s origin-center;
}

.header-menu-item,
.button-primary {
  transition: all 2s;
  pointer-events: auto; 
}

#menr-toolgle > path:nth-of-type1 { transform: rotate(45deg);}
#menr-toolgle > path:nth-of-type2 { transform: rotate(-45deg);}

@media (max-width: 768px) {
  .header-card {
    /* margin-right: 1rem;
    margin-left: 1rem; 
    min-width: auto;*/
  }

  /* .header-header {
    padding: 0 1rem;
  } */

  .header-menu-list {
    padding: 0 1rem;
  }
}
</style>
