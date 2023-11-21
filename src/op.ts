import { App, DirectiveBinding } from "vue";

export default (app: App) => {
  app.directive("op", {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      console.log(el, binding);
      console.log(hasOp(binding.value), 555);
      if (!hasOp(binding.value)) {
        el.style.display = "none";
      }
    },
  });
};

function hasOp(op: string) {
  const operation: string[] = JSON.parse(
    localStorage.getItem("operation") as string
  );
  return operation.includes(op);
}
