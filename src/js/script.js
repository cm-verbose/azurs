/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Editor_1 = __importDefault(__webpack_require__(1));
var Main = /** @class */ (function () {
    function Main() {
        this.ini();
    }
    Main.prototype.ini = function () {
        new Editor_1.default();
    };
    return Main;
}());
new Main();


/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Editor = /** @class */ (function () {
    function Editor() {
        this.editor = document.querySelector("#editor");
        this.initialParagraph = document.querySelector("#initial-paragraph");
        this.handleEditorInput();
    }
    /** Handles inputs */
    Editor.prototype.handleEditorInput = function () {
        var _this = this;
        this.editor.addEventListener("beforeinput", function (event) {
            switch (event.inputType) {
                case "deleteContentBackward":
                    {
                        _this.handleBackwardsDeletion(event);
                    }
                    break;
                case "insertParagraph":
                    {
                        _this.handleParagraphInsertion(event);
                    }
                    break;
            }
        });
    };
    /** Handles deletion of characters with the <backspace> key, also preserves the initial paragraph */
    Editor.prototype.handleBackwardsDeletion = function (event) {
        var targetRanges = event.getTargetRanges();
        if (targetRanges.length === 1) {
            this.handleSingleRangeBackwardsDeletion(event, targetRanges[0]);
        }
        else {
            // Handle multiple StaticRange objects ?
            for (var _i = 0, targetRanges_1 = targetRanges; _i < targetRanges_1.length; _i++) {
                var range = targetRanges_1[_i];
                console.info("[Backwards deletion]:", range);
            }
        }
    };
    /** Handle deletion when a single StaticRange is available */
    Editor.prototype.handleSingleRangeBackwardsDeletion = function (event, targetRange) {
        var _this = this;
        var startP = this.getEditorLevelParent(targetRange.startContainer);
        var endP = this.getEditorLevelParent(targetRange.endContainer);
        var isInitialParagraph = this.getEditorLevelParent(startP).isSameNode(this.initialParagraph);
        var sO = targetRange.startOffset;
        if (startP.isEqualNode(endP)) {
            var eO = targetRange.endOffset;
            var rangeLength = eO - sO;
            var initialText = this.initialParagraph.innerText;
            if (isInitialParagraph && initialText.length === rangeLength) {
                event.preventDefault();
                this.initialParagraph.innerHTML = "";
                this.initialParagraph.removeAttribute("data-empty");
            }
        }
        else {
            if (isInitialParagraph && sO === 0) {
                setTimeout(function () {
                    _this.initialParagraph.innerHTML = "";
                    if (_this.editor.childElementCount !== 1) {
                        _this.initialParagraph.setAttribute("data-empty", "");
                    }
                    else {
                        _this.initialParagraph.removeAttribute("data-empty");
                    }
                });
            }
        }
    };
    /** Handles inserting paragraphs into the editor */
    Editor.prototype.handleParagraphInsertion = function (event) {
        var targetRanges = event.getTargetRanges();
        if (targetRanges.length === 1) {
            this.handleSingleRangeParagraphInsertion(event, targetRanges[0]);
        }
        else {
            // Handle multiple StaticRange objects ?
            for (var _i = 0, targetRanges_2 = targetRanges; _i < targetRanges_2.length; _i++) {
                var range = targetRanges_2[_i];
                console.info("[Paragraph Insertion]", range);
            }
        }
    };
    /** Handles inserting a paragraph when a single StaticRange is available */
    Editor.prototype.handleSingleRangeParagraphInsertion = function (event, targetRange) {
        event.preventDefault();
        var selection = window.getSelection();
        if (!selection)
            return;
        var startContainer = targetRange.startContainer;
        // Copying range, deleting content
        var range = new Range();
        range.setStart(startContainer, targetRange.startOffset);
        range.setEnd(targetRange.endContainer, targetRange.endOffset);
        range.deleteContents();
        // Paragraph creation
        var newP = document.createElement("p");
        var startP = this.getEditorLevelParent(startContainer);
        var newPRange = new Range();
        if (startP.lastChild === null) {
            var newline = document.createElement("br");
            newP.appendChild(newline);
        }
        else {
            newPRange.setStart(startContainer, targetRange.startOffset);
            newPRange.setEndAfter(startP.lastChild);
            var nodes = newPRange.extractContents();
            if (nodes.textContent === null || nodes.textContent.length === 0) {
                var newline = document.createElement("br");
                newP.appendChild(newline);
            }
            else {
                nodes.childNodes.forEach(function (child) {
                    newP.appendChild(child);
                });
            }
        }
        startP.insertAdjacentElement("afterend", newP);
        newPRange.setStartBefore(newP);
        newPRange.setEndBefore(newP);
        selection.removeAllRanges();
        selection.addRange(newPRange);
        newP.scrollIntoView({
            behavior: "instant",
            block: "center",
        });
        if (this.editor.childElementCount > 1) {
            this.initialParagraph.setAttribute("data-empty", "");
        }
    };
    Editor.prototype.getEditorLevelParent = function (node) {
        var parent = node;
        while (parent.parentNode !== null && !parent.parentNode.isEqualNode(this.editor)) {
            parent = parent.parentNode;
        }
        return parent;
    };
    return Editor;
}());
exports["default"] = Editor;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;