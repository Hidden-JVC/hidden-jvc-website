<template>
    <div>
        Logs:
        <ul style="max-height: 65px; overflow-y: auto" ref="logs">
            <li v-for="(log, i) of $store.state.application.logs.slice().reverse()" :key="log" :class="{ 'blue--text': i === 0 }">
                {{ log }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Logs'
};
</script>