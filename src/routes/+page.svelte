<script>
    import "../app.css";
    import { goto } from '$app/navigation';
  
    const options = [
      { name: "Ledger Live", address: "0x1e68238ce926dec62b3fbc99ab06eb1d85ce0270" },
      { name: "Safe", address: "0xc9db9bf0c9c8fa30b09c45233e6a2d5eeff9abf3" },
      { name: "Kiln dApp", address: "0xef650d5dbe75f39e2ec18a4381f75c8a4d4e19c8" },
      { name: "Enzyme", address: "0x0816df553a89c4bff7ebfd778a9706a989dd3ce3" },
      { name: "Consensys", address: "0xdc71affc862fceb6ad32be58e098423a7727bebd" }
    ];
  
    function redirectToDashboard(option) {
      goto(`/dashboard/${option.address}`);
    }
  </script>
  
  <div class="flex flex-col space-y-2">
    {#each options as option}
      <button 
        on:click={() => redirectToDashboard(option)} 
        class="w-full rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 px-4 py-2 text-left transition duration-200"
      >
        {option.name} - {option.address}
      </button>
    {/each}
  </div>
  
  <style>
    button {
      transition: background-color 0.2s ease;
    }
  
    button:hover {
      background-color: #f3f4f6; /* Tailwind's gray-100 */
    }
  </style>