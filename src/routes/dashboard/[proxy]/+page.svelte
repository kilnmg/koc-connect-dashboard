<script>
    /** @type {import('./$types').PageData} */
    import "../../../app.css";
    // import Dropdown from '$lib/dropdown.svelte';
    export let data;
    const { proxy, kpis } = data;
    const {
        totalRewards,
        totalRewardsUSD,
        tvl,
        tvlUSD,
        avgAPY,
        avgAPYNet,
        generatedRevenue,
        generatedRevenueUSD,
        estArr,
        estArrUSD,
        activeVals,
        totalRewardsNet,
        totalRewardsNetUSD,
        uniques,
        avgPerSafe,
        avgPerSafeUSD,
    } = kpis;

    /**
     * Formats a number into a more readable string with K, M, or B suffixes.
     * @param {number} num - The number to format.
     * @returns {string} - The formatted number string.
     */
    const formatNumber = (num) => {
        if (num === null || num === undefined || isNaN(num)) {
            return "0"; // Return 0 for invalid numbers
        }

        const absNum = Math.abs(num);
        if (absNum < 1e3) {
            return num.toFixed(2); // Less than 1,000
        } else if (absNum < 1e6) {
            return (num / 1e3).toFixed(1) + "K"; // Thousands
        } else if (absNum < 1e9) {
            return (num / 1e6).toFixed(1) + "M"; // Millions
        } else {
            return (num / 1e9).toFixed(1) + "B"; // Billions
        }
    };
</script>

<!-- Ensure you import headless UI dependencies in your project -->
<div class="min-h-screen0">
    <div class="px-4 pt-4 flex space-x-4 justify-between">
        <div class="bg-color-stone-900">
            <div class="w-full bg-white text-gray-700 py-2 px-4 rounded-md border border-gray-300 text-left shadow-sm">
                Proxy: <span>{proxy}</span>
            </div>
        </div>
        <div class="bg-color-stone-900">
            <a
            class="flex items-center justify-center w-full h-full px-4 text-white bg-orange-600 rounded-lg shadow hover:bg-orange-700 transition duration-200 ease-in-out"
            href="https://www.bageth.xyz/mainnet/stakes?search={proxy}"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                />
            </svg>
            <span class="font-md">Explore validators on bageth</span>
        </a>
        </div>
    </div>
    <div class="h-max p-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="h-max bg-stone-200 rounded p-4 flex flex-col items-left">
            <span class="text-gray-600 text-sm">Total staked</span>
            <div class="flex mt-4 items-end">
                <span class="text-xl font-semibold text-gray-800 mr-2"
                    >{formatNumber(tvl)} ETH</span
                >
                <span class="text-md font-thin text-gray-600 pb-0.5"
                    >${formatNumber(tvlUSD)}</span
                >
            </div>
        </div>
        <div class="h-max bg-stone-200 rounded p-4 flex flex-col items-left">
            <span class="text-gray-600 text-sm">Unique stakers</span>
            <span class="text-xl font-semibold text-gray-800 mt-4"
                >{uniques}</span
            >
        </div>
        <div class="h-max bg-stone-200 rounded p-4 flex flex-col items-left">
            <span class="text-gray-600 text-sm">Avg. staked</span>
            <div class="flex mt-4 items-end">
                <span class="text-xl font-semibold text-gray-800 mr-2"
                    >{formatNumber(avgPerSafe)} ETH</span
                >
                <span class="text-md font-thin text-gray-600 pb-0.5"
                    >${formatNumber(avgPerSafeUSD)}</span
                >
            </div>
        </div>
        <div class="h-max bg-stone-200 rounded p-4 flex flex-col items-left">
            <span class="text-gray-600 text-sm">Active validators</span>
            <span class="text-xl font-semibold text-gray-800 mt-4"
                >{activeVals}</span
            >
        </div>
        <div class="h-max bg-stone-200 rounded p-4 flex flex-col items-left">
            <span class="text-gray-600 text-sm">Avg. gross rewards</span>
            <span class="text-xl font-semibold text-gray-800 mt-4"
                >{formatNumber(avgAPY * 100)}%</span
            >
        </div>
        <div class="h-max bg-stone-200 rounded p-4 flex flex-col items-left">
            <span class="text-gray-600 text-sm">Avg. net rewards</span>
            <span class="text-xl font-semibold text-gray-800 mt-4"
                >{formatNumber(avgAPYNet * 100)}%</span
            >
        </div>
        <div class="h-max bg-stone-200 rounded p-4 flex flex-col items-left">
            <span class="text-gray-600 text-sm">Total rewards</span>
            <div class="flex mt-4 items-end">
                <span class="text-xl font-semibold text-gray-800 mr-2"
                    >{formatNumber(totalRewards)} ETH</span
                >
                <span class="text-md font-thin text-gray-600 pb-0.5"
                    >${formatNumber(totalRewardsUSD)}</span
                >
            </div>
        </div>
        <div class="h-max bg-stone-200 rounded p-4 flex flex-col items-left">
            <span class="text-gray-600 text-sm">Total net rewards</span>
            <div class="flex mt-4 items-end">
                <span class="text-xl font-semibold text-gray-800 mr-2"
                    >{formatNumber(totalRewardsNet)} ETH</span
                >
                <span class="text-md font-thin text-gray-600 pb-0.5"
                    >${formatNumber(totalRewardsNetUSD)}</span
                >
            </div>
        </div>
    </div>
    <div class="p-4">
        <h2 class="text-xl mb-1">Revenue</h2>
        <hr />
        <div
            class="col-span-2 lg:col-span-2 grid grid-cols-2 lg:grid-cols-2 gap-4 mt-4"
        >
            <div
                class="h-max bg-white rounded border border-solid border-gray-300 p-4 flex flex-col items-left"
            >
                <span class="text-gray-600 text-sm">All time revenue</span>
                <div class="flex mt-4 items-end">
                    <span class="text-xl font-semibold text-gray-800 mr-2"
                        >{formatNumber(generatedRevenue)} ETH</span
                    >
                    <span class="text-md font-thin text-gray-600 pb-0.5"
                        >${formatNumber(generatedRevenueUSD)}</span
                    >
                </div>
            </div>

            <div
                class="h-max bg-white rounded border border-solid border-gray-300 p-4 flex flex-col items-left"
            >
                <span class="text-gray-600 text-sm"
                    >Projected ARR (before rev-share)</span
                >
                <div class="flex mt-4 items-end">
                    <span class="text-xl font-semibold text-gray-800 mr-2"
                        >{formatNumber(estArr)} ETH</span
                    >
                    <span class="text-md font-thin text-gray-600 pb-0.5"
                        >${formatNumber(estArrUSD)}</span
                    >
                </div>
            </div>
        </div>
    </div>
    <footer class="mt-4">
        <p class="text-center text-gray-400">
            Made with ♡ by <a href="https://www.kiln.fi">Kiln</a>
        </p>
    </footer>
</div>
