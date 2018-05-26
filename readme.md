# Jest-Allure reporting plugin

Add more power to your test using Jest-Allure.

Easily generate nice reports at the end of the execution.

Allure Framework is a flexible lightweight multi-language test report tool that not only
shows a very concise representation of what have been tested in a neat web report form,
but allows everyone participating in the development process to extract maximum of useful
information from everyday execution of tests.

![Allure Report](https://user-images.githubusercontent.com/2823336/40350093-59cad576-5db1-11e8-8210-c4db3bf825a1.png)

# Installation

```
yarn add -D jest-allure
```
or

```
npm install --save-dev jest-allure
```

#### add reporter to jest.config.js
```
reporters: ["default", "jest-allure"],
```

Run your tests and enjoy 🥤🚀

---

#### How to get a report

To see a report in browser, run in console

```
allure serve
```

If you want to generate html version, run in console

```
allure generate
```

#### What's next

[x] Generate report from Jest results

[ ] Add steps support

[ ] Add labels support

[ ] Add attachments support

---

#### Warning
``jest-allure`` reporter dynamically configure "setupTestFrameworkScriptFile" option in Jest configuration.
**If you have your own setupTestFrameworkScriptFile file**, you need to manually register allure reporter.

```typescript
import { registerAllureReporter } from "jest-allure/dist/setup";
...
registerAllureReporter();
```

## Contributors
| [<img src="https://avatars3.githubusercontent.com/u/2823336?s=460&v=4" width="100px;"/><br/><sub><b>Denis Artyuhovich</b></sub>](https://denis.by) | [<img src="https://avatars1.githubusercontent.com/u/7804416?s=460&v=4" width="100px;"/><br/><sub><b>Dmitry Bogomya</b></sub>](https://github.com/bogomya) |
| ---      | ---       |
