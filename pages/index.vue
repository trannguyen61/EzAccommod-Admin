<template>
  <div class="auth login">
    <div class="auth-form">
      <div class="auth-form--title">
        Đăng nhập admin
      </div>

      <div class="auth-form--tab">
        <v-form
          v-model="formValue"
          class="auth-form--form"
        >
          <v-text-field
            v-model="form.email"
            :rules="isEmail()"
            label="Email"
            class="mt-6"
          />

          <v-text-field
            v-model="form.password"
            :rules="validPassword()"
            label="Mật khẩu"
            class="mt-6"
          />

          <button
            v-ripple
            type="button"
            :disabled="!formValue"
            class="custom-btn custom-btn--text custom-btn__densed custom-btn__block mt-6"
            @click="onLogin"
          >
            Đăng nhập
          </button>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import validationRules from '@/helpers/validationRules'
import ApiHandler from '@/helpers/ApiHandler'
import { mapActions } from 'vuex'

export default {
    data () {
        return {
            tab: null,
            formValue: false,
            form: {
                email: '',
                password: '',
            }
        }
    },

    methods: {
        ...mapActions({
            login: 'user/login'
        }),

        async onLogin () {
          const data = this.form
          const handler = new ApiHandler()
                        .setData(data)
                        .setOnResponse(() => {
                          this.$router.push('/')
                        })
          await this.login(handler)
        },

        isEmail () {
            return [validationRules.requiredField, validationRules.isEmail]
        },

        validPassword () {
            return [validationRules.requiredField, validationRules.minField(6)]
        }
    }
}
</script>