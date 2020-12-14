<template>
    <v-dialog v-model="$store.state.application.errorDialogOpen" :max-width="450">
        <v-card>
            <v-card-title class="error py-1">
                Erreur
            </v-card-title>

            <v-card-text class="pt-4">
                {{ $store.state.application.errorDialogMessage }}
            </v-card-text>

            <v-card-actions>
                <v-btn @click="closeErrorDialog()" color="secondary" depressed small>
                    Ok
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'ErrorDialog'
};
</script>