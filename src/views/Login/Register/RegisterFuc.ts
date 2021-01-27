import { toRaw } from "vue";
import { validateOptions } from '@ant-design-vue/use/lib/useForm'
import { UserConfig } from '@/@type/interfaceRegister';

export const handleClickRegister = ($event: MouseEvent, validate: <T = any>(names?: string | string[], option?: validateOptions) => Promise<T>, reaRegisterInput: UserConfig) => {
  const e = $event;
  e.preventDefault();
  validate()
    .then(res => {
      console.log(res, toRaw(reaRegisterInput));
      // 需要验证是否符合规定
    })
    .catch(err => {
      console.log("error", err);
    });
};

export function clickGetEmailCode(...params: any) {
  console.log("params: ", params);
}