<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let isOpen = false;
  let selected = "Ledger Live - 0x1e68238ce926dec62b3fbc99ab06eb1d85ce0270";
  const options = [
    { name: "Ledger Live", address: "0x1e68238ce926dec62b3fbc99ab06eb1d85ce0270" },
    { name: "Safe", address: "0xc9db9bf0c9c8fa30b09c45233e6a2d5eeff9abf3" },
    { name: "Kiln dApp", address: "0xef650d5dbe75f39e2ec18a4381f75c8a4d4e19c8" },
  ];

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  function selectOption(option) {
    selected = `${option.name} - ${option.address}`;
    goto(`/dashboard/{option.address}`);
    isOpen = false; // close dropdown after selection
  }
</script>

<div class="relative inline-block text-left">
  <div>
    <button
      type="button"
      class="flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      on:click={toggleDropdown}
      aria-haspopup="true"
      aria-expanded={isOpen}
    >
      {selected}
      <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06 0L10 10.793l3.71-3.58a.75.75 0 111.04 1.08l-4.25 4a.75.75 0 01-1.06 0l-4.25-4a.75.75 0 010-1.08z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>

  {#if isOpen}
    <div class="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div class="py-1">
        {#each options as option}
          <a 
            href="{option.address}" 
            class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" 
          >
            {option.name} - {option.address}
          </a>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  /* Example of styling based on the provided image */
  button {
    transition: background-color 0.2s ease;
  }

  button:hover {
    background-color: #f3f4f6; /* Tailwind's gray-100 */
  }
  
  .block:hover {
    background-color: #f3f4f6; /* Tailwind's gray-100 */
  }
</style>