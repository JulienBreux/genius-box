Polymer('genius-box', {
    // Imported items
    importedItems: [],

    // Display items
    items: [],

    // Initial position
    position: 0,

    // Initial cursor
    cursor: -1,

    // Search delay
    searchDelay: 400,

    // Custom AJAX object
    xhr: null,

    /**
     * Ready
     */
    ready: function () {
        window.addEventListener('openGeniusBox', this.open);
    },

    /**
     * Manage overlay
     */
    overlay: function () {
        var $this = this;
        var overlay = $this.$['box-overlay'];

        return {
            show: function () {
                overlay.className = '';

                return this;
            },
            hide: function () {
                overlay.className = 'close';

                return this;
            }
        }
    },

    /**
     * Manage box
     */
    box: function () {
        var $this = this;
        var box = $this.$['box-container'];

        return {
            show: function () {
                box.className = '';

                return this;
            },
            hide: function () {
                box.className = 'close';

                return this;
            }
        }
    },

    /**
     * Manage input
     */
    input: function () {
        var $this = this;
        var input = $this.$['input'];

        return {
            bind: function (e) {
                // Key up events
                if ('keyup' === e.type) {
                    // Move up
                    if (38 === e.keyCode) {
                        $this.list().move().up();
                    }
                    // Move down
                    else if (40 === e.keyCode) {
                        $this.list().move().down();
                    }
                    // Enter
                    else if (13 === e.keyCode) {
                        $this.action().run($this.list().current());
                    }
                    // Escape
                    else if (27 === e.keyCode) {
                        $this.close();
                    }
                    // Others
                    else {
                        // Close list
                        if (0 === input.value.length) {
                            $this.list().close();
                        }
                        // Search
                        else {
                            delay($this.action().search, $this.searchDelay);
                            
                        }
                    }

                    e.preventDefault();
                }
                // Key down events
                else if ('keydown' === e.type) {
                    // Disable
                    if (40 === e.keyCode || 38 === e.keyCode) {
                        this.disableCursor(e);
                    }
                    // Autocomplete with tab
                    if (9 === e.keyCode) {
                        this.autoComplete(e);
                    }
                }

                return this;
            },
            disableCursor: function(e) {
                e.preventDefault();

                return this;
            },
            autoComplete: function (e) {
                input.value = $this.list().current().title + ' ';
                this.cursorEnd();
                e.preventDefault();

                return this;
            },
            cursorEnd: function () {
                input.setSelectionRange(input.value.length, input.value.length);
            },
            focus: function () {
                input.focus();

                return this;
            },
            clear: function () {
                input.value = '';

                return this;
            },
            text: function () {
                return input.value;
            },
            spinner: function () {
                return {
                    show: function () {
                        $this.$['input-spinner'].style.display = 'block';
                    },
                    hide: function () {
                        $this.$['input-spinner'].style.display = 'none';
                    }
                }
            }
        }
    },

    /**
     * Manage list
     */
    list: function () {
        var $this = this;
        var list = $this.$['box-list'];

        return {
            bind: function (e) {
                if ('mouseover' === e.type) {
                    this.select(e);
                }
                else if ('click' === e.type) {
                    $this.action().run(this.current());
                }

                return this;
            },
            currentIndex: function () {
                return $this.items.reduce(function (last, item, indexItem) {
                    return item.current ? indexItem : last;
                }, 0);
            },
            current: function () {
                return $this.items[this.currentIndex()];
            },
            select: function (e) {
                item = e.target.templateInstance.model.item;
                this.selectCurrent(item);

                return this;
            },
            selectCurrent: function (item) {
                this.unSelectAll();
                if (!item) {
                    return;
                }
                item.current = true;
                $this.cursor = this.currentIndex();

                return this;
            },
            cursorInit: function () {
                $this.cursor = -1;
            },
            cursorSelect: function () {
                this.selectCurrent($this.items[$this.cursor]);

                return this;
            },
            unSelectAll: function() {
                $this.items.map(function (item) {
                    item.current = false;
                });

                return this;
            },
            move: function () {
                return {
                    first: function () {
                        $this.cursor = 0;
                        $this.position = 0;
                        $this.list().displayItems($this.position);
                        $this.list().selectCurrent($this.items[$this.cursor]);
                    },
                    last: function() {
                        var maxDisplayItems = $this.list().maxDisplayItems();
                        $this.cursor = maxDisplayItems - 1;
                        $this.position = $this.importedItems.length - maxDisplayItems;
                        $this.list().displayItems($this.position);
                        $this.list().selectCurrent($this.items[$this.cursor]);
                    },
                    up: function () {
                        if ($this.cursor > 0) {
                            $this.cursor--;
                            $this.list().cursorSelect();
                        } else {
                            $this.position--;
                            var displayable = $this.list().displayItems($this.position);
                            if (displayable) {
                                $this.list().cursorSelect();
                            } else {
                                this.last();
                            }
                        }
                    },
                    down: function () {
                        if ($this.cursor < ($this.list().maxDisplayItems() - 1)) {
                            $this.cursor++;
                            $this.list().cursorSelect();
                        } else {
                            $this.position++;
                            var displayable = $this.list().displayItems($this.position);
                            if (displayable) {
                                $this.list().cursorSelect();
                            } else {
                                this.first();
                            }
                        }
                    }
                }
            },
            maxDisplayItems: function () {
                return parseInt($this['max-display-items'] || 5);
            },
            displayItems: function (start) {
                var end = start + this.maxDisplayItems();

                if (start >= 0 && end <= $this.importedItems.length) {
                    $this.items = $this.importedItems.slice(start, end);

                    return true;
                }

                return false;
            },
            clear: function () {
                $this.items = [];

                return this;
            },
            open: function () {
                list.className = '';
                list.style.maxHeight = Math.round(parseInt(this.maxDisplayItems()) * 80) + 'px';
                this.displayItems(0);

                return this;
            },
            close: function () {
                this.clear();
                this.cursorInit();
                $this.position = 0;
                list.className = 'close';

                return this;
            },
        }
    },

    /**
     * Action
     */
    action: function () {
        var $this = this;

        return {
            actions: function () {
                return {
                    redirect: function (parameters) {
                        var url = parameters.url;

                        url = url.replace(/\{?\{\{\s*(.*?)\s*\}\}\}?/g, function (match, varName) {
                            return typeof parameters[varName] != 'undefined' ? parameters[varName] : '';
                        });

                        if (parameters.hasOwnProperty('otherWindow')) {
                            window.open(url);
                        } else {
                            location.href = url;
                        }

                        $this.close();
                    }
                }
            },
            search: function () {
                var query = $this.input().text();

                $this.remote().hydrate(query);
                console.log(query);
            },
            run: function (item) {
                if (item.action && this.actions().hasOwnProperty(item.action)) {
                    this.actions()[item.action](item.parameters);
                }
            }
        }
    },

    /**
     * Remote
     */
    remote: function () {
        $this = this;

        return {
            request: function (url, query, callback) {
                $this.input().spinner().show();

                if (typeof XMLHttpRequest !== 'undefined') {
                    $this.xhr = new XMLHttpRequest();
                }
                else {
                    var versions = ['MSXML2.XmlHttp.5.0', 
                                    'MSXML2.XmlHttp.4.0',
                                    'MSXML2.XmlHttp.3.0', 
                                    'MSXML2.XmlHttp.2.0',
                                    'Microsoft.XmlHttp'];
 
                    for (var i = 0, len = versions.length; i < len; i++) {
                        try {
                            $this.xhr = new ActiveXObject(versions[i]);
                            break;
                        }
                        catch (e) {}
                    }
                }

                $this.xhr.onreadystatechange = function () {
                    if ($this.xhr.readyState == 4 && $this.xhr.status == 200) {
                        $this.input().spinner().hide();
                        callback(JSON.parse($this.xhr.responseText));
                    }
                }
         
                $this.xhr.open('GET', url + '?q=' + query, true);
                $this.xhr.send();
            },
            hydrate: function (query) {
                this.request($this.source, query, function (data) {
                    $this.importedItems = data.items;
                    $this.list().displayItems(0);
                    $this.list().open();
                });
            }
        }
    },

    /**
     * Open GeniusBox
     */
    open: function () {
        this.overlay().show();
        this.box().show();
        this.input().clear().focus();
        this.list().close();
    },

    /**
     * Close GeniusBox                                                                                                                                                                                                                                                   
     */
    close: function () {
        this.overlay().hide();
        this.box().hide();
        this.input().clear();
        this.list().close();
    },

    /**
     * Events proxies
     */
     eventList: function (e) {this.list().bind(e)},
     eventInput: function (e) {this.input().bind(e)},
});

var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

