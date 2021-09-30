"use strict";

(async () => {
  const { msg } = await import("my-pkg");
  console.log(msg);
})();
