<template>
    <div :class="[
        type === 'textarea' ? 'zn_textarea' : 'zn_input',
        inputSize ? 'zn_input--' + inputSize : '',
        {
            'is-disabled': inputDisabled,
            'is-exceed': inputExceed,
            'zn_input-group': $slots.prepend || $slots.append,
            'zn_input-group--append': $slots.append,
            'zn_input-group--prepend': $slots.prepend,
            'zn_input--prefix': $slots.prefix || prefixIcon,
            'zn_input--suffix': $slots.suffix || suffixIcon || clearable || showPassword
        }
        ]"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
    >
        <template v-if="type !== 'textarea'">
            <!-- 前置元素 -->
            <div class="zn_input-group__prepend" v-if="$slots.prepend">
                <slot name="prepend"></slot>
            </div>
            <input 
                :tabindex="tabindex"
                v-if="type !== 'textarea'"
                class="zn_input__inner"
                v-bind="$attrs"
                :type="showPassword ? (passwordVisible ? 
                'text': 'password') : type"
                :disabled="inputDisabled"
                :readonly="readonly"
                :autocomplete="autocomplete || autoComplete"
                ref="input"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
                :aria-label="label"
            />
        </template>
        <template v-else
            :tabindex="tabindex"
            class="zn_textarea__inner"
            ref="textarea"
            v-bind="$attrs"
            :disabled="inputDisabled"
            :readonly="readonly"
            :autocomplete="autoComplete || autocomplete"
            :style="textareaStyle"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
            :aria-label="label"
        >

        </template>
        <!-- textarea单独显示文字输入的字数 -->
        <span
            v-if="isWordLimitVisible && type === 'textarea'"
            class="zn_input__count">
            {{textLength}}/{{upperLimit}}
        </span>
    </div>
</template>

<script>
import merge from 'src/utils/merge'
export default {
    name: "ZnInput",
    props: {
        value: [String, Number],
        size: String,
        resize: String,
        form: String,
        disabled: Boolean,
        readonly: Boolean, // 是否只读
        type: {
            type: String,
            default: 'text'
        },
        autosize: {
            type: [Boolean, Object],
            default: false
        },
        autocomplete: { // 自动补全
            type: String,
            default: 'off'
        },
        autoComplete: { // 自动补全 下个版本废除
            type: String,
            validator(val) {
                process.env.NODE_ENV !== 'production' && console.warn('[autoComplete]下个版本废除')
                return true;
            }
        },
        validateEvent: {
            type: Boolean,
            default: true
        },
        suffixIcon: String,
        prefixIcon: String,
        label: String,
        clearable: {
            type: Boolean,
            default: false
        },
        showPassword: {
            type: Boolean,
            default: false
        },
        // 显示文字输入字数和最大值
        showWordLimit: {
            type: Boolean,
            default: false
        },
        tabindex: String
    },
    computed: {
        inputSize() {
           return this.size 
        },
        inputDisabled() {
            return this.disabled
        },
        // 显示文字输入字数和最大值
        isWordLimitVisible() {
            return this.showWordLimit &&
            this.$attrs.maxlength &&
            (this.type === 'text' || this.type === 'textarea') &&
            !this.inputDisabled &&
            !this.readonly &&
            !this.showPassword
        },
        // 获取输入框文字字数
        textLength() {
            if (typeof this.value === 'number') {
                return String(this.value).length
            }
            return (this.value || '').length
        },
        // ?
        upperLimit() {
            return this.$attrs.maxlength
        },
        inputExceed() {
            return this.isWordLimitVisible && (this.textLength > this.upperLimit)
        },
        textareaStyle() {
            return merge({}, this.textareaCalcStyle, {resize: this.resize})
        },
        nativeInputValue() {
            return this.value === null || this.value === undefined ? '' : String(this.value)
        }
    },
    watch: {

    },
    data() {
        return {
            textareaCalcStyle: {},
            hovering: false,
            focused: false,
            passwordVisible: false,
            isComposing: false
        }
    },
    methods: {
        focus() {
            this.getInput().focus()
        },
        blur() {
            this.getInput().blur()
        },
        handleFocus(event) {
            this.focused = true
            this.$emit('focus', event)
        },
        handleBlur(event) {
            this.focused = false
            this.$emit('blur', event)
            if(this.validateEvent) {
                this.dispatch('ZnFormItem', 'zn.form.blur', [this.value])
            }
        },
        handleChange(event) {
            this.$emit('change', event.target.value)
        },
        handleInput(event) {
            if (this.isComposing) return
            if (event.target.value === this.nativeInputValue) return
            this.$emit('input', event.target.value)
            this.$nextTick(this.setNativeInputValue)
        },
        // 显示隐藏密码
        handlePasswordVisible() {
            this.passwordVisible = !this.passwordVisible
            this.focus()
        },
        getInput() {
            return this.$refs.input || this.$refs.textarea
        },
        // 设置input框的值
        setNativeInputValue() {
            const input = this.getInput()
            if (!input) return
            if (input.value === this.nativeInputValue) return 
            input.value = this.nativeInputValue
        }
    }
}
</script>