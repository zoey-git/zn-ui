<template>
    <button
        class="zn_button"
        @click="handleClick"
        :disabled="buttonDisabled || loading"
        :class="[
            type ? `zn_button--${type}` : '',
            buttonSize ? `zn_button--${buttonSize}`:'',
            {
                'is-disabled': buttonDisabled,
                'is-loading': loading,
                'is-round': round,
                'is-plain': plain,
                'is-circle': circle
            }
        ]"
    >
        <i class="iconjiazaixiao" v-if="loading"></i>
        <i :class="icon" v-if="icon && !loading"></i>
        <span v-if="$slots.default"><slot></slot></span>
    </button>
</template>

<script>
export default {
    name: 'ZnButton',
    props: {
        type: {
            type: String,
            default: 'default'
        },
        size: String,
        icon: {
            type: String,
            default: ''
        },
        loading: Boolean,
        disabled: Boolean,
        round: Boolean,
        plain: Boolean,
        circle: Boolean
    },
    data() {
        return {
        }
    },
    computed: {
        buttonDisabled() {
            return this.disabled
        },
        buttonSize() {
            return this.size
        }
    },
    methods: {
        handleClick(evt) {
            this.$emit('click', evt)
        }
    }
}
</script>

<style>

</style>
