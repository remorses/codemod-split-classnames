<div align='center'>
    <br/>
    <br/>
    <img src='' width='320px'>
    <br/>
    <h1></h1>
    <p>Splits long className attributes into shorter calls to `classnames`</p>
    <br/>
    <br/>
</div>

## Example

The following code

```tsx
function Component() {
    return (
        <Fragment>
            <p className='block w-full py-2 mt-8 text-sm font-semibold text-center text-white bg-gray-900 border border-black rounded-md hover:bg-gray-700 disabled:bg-gray-900 hover:cursor-pointer disabled:opacity-60' />
        </Fragment>
    )
}
```

becomes

```tsx
import clsx from 'classnames'
function Component() {
    return (
        <Fragment>
            <p
                className={clsx(
                    'block w-full py-2 mt-8 text-sm',
                    'font-semibold text-center text-white bg-gray-900 border',
                    'border-black rounded-md hover:bg-gray-700 disabled:bg-gray-900 hover:cursor-pointer',
                    'disabled:opacity-60',
                )}
            />
        </Fragment>
    )
}
```

## Usage as a cli

```sh
npm i -g split-classnames
# split classnames on all js files in the src directory
split-classnames --dry --max 30 'src/**'
```

## Usage as an eslint plugin

Install the plugin:

```sh
npm i -D eslint-plugin-split-classnames
```

Add the plugin to your eslint config:

```json
// .eslintrc.json
{
    "plugins": ["split-classnames"],
    "rules": {
        "split-classnames/split-classnames": [
            "error",
            {
                "maxClassNameCharacters": 10,
                "functionName": "cs"
            }
        ]
    }
}
```

Then run eslint with `--fix` to split long classnames

```sh
eslint --fix ./src
```

## Features

-   Works bot on typescript and javascript jsx
-   Works on string literals (`className='something'`)
-   Works on template literals (`className={`something ${anotherClass}`}`)
-   Works on existing classnames calls (`className={clsx('very long classNames are slitted in groups')}`)
-   Sorts the classes for tailwind (variants like `sm:` and `lg:` are put last)
