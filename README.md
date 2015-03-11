# &lt;genius-box&gt;

> Web Component to display an amazing launcher box like Alfred Mac.

## Demo

[Check it live!](http://iadvize.github.io/genius-box)

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install genius-box --save
```

Or [download as ZIP](https://github.com/iadvize/genius-box/archive/gh-pages.zip).

## Usage

1. Import Web Components' polyfill:

    ```html
    <script src="bower_components/webcomponentsjs/webcomponents.min.js"></script>
    ```

2. Import Custom Element:

    ```html
    <link rel="import" href="bower_components/genius-box/dist/genius-box.html">
    ```

3. Start using it!

    ```html
    <genius-box source="data.json"></genius-box>
    ```

## Options

Attribute           | Options   | Default      | Description
---                 | ---       | ---          | ---
`source`            | *string*  | -            | Specifies the source of items displayed.
`max-display-items` | *integer* | 5            | Specifies the number of max display items.
`placeholder`       | *string*  | `Search...`  | Specifies the placeholder of input.

### Methods

Method    | Parameters  | Returns  | Description
---       | ---         | ---      | ---
`open()`  | None.       | Nothing. | Triggers the genius box to be opened.
`close()` | None.       | Nothing. | Triggers the genius box to be closed.

## Source

```json
{
    "items": [
        {"iconClass": "ico-green", "title": "Green", "action": "redirect", "parameters": {"url": "index.html#{{color}}", "otherWindow": true, "color": "green"}}
    ]
}
```

### Item options

Name       | Options  | Default | Description
---        | ---      | ---     | ---
iconClass  | *string* | -       | CSS class name of item icon.
title      | *string* | -       | Title of item.
action     | redirect | -       | Action of item.
parameters | *object* | -       | Parameters of item action.

#### Action redirect parameters

Name        | Options   | Default | Description
---         | ---       | ---     | ---
url         | *string*  | -       | URL used to redirect.
otherWindow | *boolean* | false   | Open URL in other window.
*           | *string*  | -       | Used like variable in url with this syntax `{{var}}`. See example above.

## Browser Support

![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) | ![Chrome](https://cloud.githubusercontent.com/assets/398893/3528328/23bc7bc4-078e-11e4-8752-ba2809bf5cce.png) | ![Firefox](https://cloud.githubusercontent.com/assets/398893/3528329/26283ab0-078e-11e4-84d4-db2cf1009953.png) | ![Opera](https://cloud.githubusercontent.com/assets/398893/3528330/27ec9fa8-078e-11e4-95cb-709fd11dac16.png) | ![Safari](https://cloud.githubusercontent.com/assets/398893/3528331/29df8618-078e-11e4-8e3e-ed8ac738693f.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Development

In order to run it locally you'll need to fetch some dependencies and a basic server setup.

1. Install [Bower](http://bower.io/) & [Grunt](http://gruntjs.com/):

    ```sh
    $ [sudo] npm install -g bower grunt-cli
    ```

2. Install local dependencies:

    ```sh
    $ bower install && npm install
    ```

3. To test your project, start the development server and open `http://0.0.0.0:8000`.

    ```sh
    $ grunt server
    ```

4. To build the distribution files before releasing a new version.

    ```sh
    $ grunt build
    ```

5. To provide a live demo, send everything to `gh-pages` branch.

    ```sh
    $ grunt deploy
    ```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## History

For detailed changelog, check [Releases](https://github.com/iadvize/genius-box/releases).

## License

[MIT License](http://iadvize.mit-license.org/) © iAdvize