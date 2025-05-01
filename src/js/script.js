/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/mod/editor.ts":
/*!******************************!*\
  !*** ./src/ts/mod/editor.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar Editor = /** @class */ (function () {\n    function Editor() {\n        this.editor = document.querySelector(\"#editor\");\n        this.initialParagraph = document.querySelector(\"#initial-paragraph\");\n        this.handleEditorInput();\n    }\n    /** Handles inputs */\n    Editor.prototype.handleEditorInput = function () {\n        var _this = this;\n        this.editor.addEventListener(\"beforeinput\", function (event) {\n            console.log(event.inputType);\n            switch (event.inputType) {\n                case \"deleteContentBackward\":\n                    _this.handleBackwardsDeletion(event);\n                    break;\n                case \"insertParagraph\":\n                    _this.handleParagraphInsertion(event);\n                    break;\n            }\n        });\n    };\n    /** Handles deletion of characters with the <backspace> key, also preserves the initial paragraph */\n    Editor.prototype.handleBackwardsDeletion = function (event) {\n        var targetRanges = event.getTargetRanges();\n        if (targetRanges.length === 1) {\n            this.handleSingleRangeBackwardsDeletion(event, targetRanges[0]);\n        }\n        else {\n            // Handle multiple StatocRange objects ?\n            for (var _i = 0, targetRanges_1 = targetRanges; _i < targetRanges_1.length; _i++) {\n                var range = targetRanges_1[_i];\n                console.info(\"[Backwards deletion]:\", range);\n            }\n        }\n    };\n    /** Handle deletion when a single StaticRange is available */\n    Editor.prototype.handleSingleRangeBackwardsDeletion = function (event, targetRange) {\n        var _this = this;\n        var startP = this.getEditorLevelParent(targetRange.startContainer);\n        var endP = this.getEditorLevelParent(targetRange.endContainer);\n        var isInitialParagraph = this.getEditorLevelParent(startP).isSameNode(this.initialParagraph);\n        var sO = targetRange.startOffset;\n        if (startP.isEqualNode(endP)) {\n            var eO = targetRange.endOffset;\n            var rangeLength = eO - sO;\n            var initialText = this.initialParagraph.innerText;\n            if (isInitialParagraph && initialText.length === rangeLength) {\n                event.preventDefault();\n                this.initialParagraph.innerHTML = \"\";\n                this.initialParagraph.removeAttribute(\"data-empty\");\n            }\n        }\n        else {\n            if (isInitialParagraph && sO === 0) {\n                setTimeout(function () {\n                    _this.initialParagraph.innerHTML = \"\";\n                    if (_this.editor.childElementCount !== 1) {\n                        _this.initialParagraph.setAttribute(\"data-empty\", \"\");\n                    }\n                    else {\n                        _this.initialParagraph.removeAttribute(\"data-empty\");\n                    }\n                });\n            }\n        }\n    };\n    /** Handles inserting paragraphs into the editor */\n    Editor.prototype.handleParagraphInsertion = function (event) {\n        var targetRanges = event.getTargetRanges();\n        if (targetRanges.length === 1) {\n            this.handleSingleRangeParagraphInsertion(event, targetRanges[0]);\n        }\n        else {\n            // Handle multiple StatocRange objects ?\n            for (var _i = 0, targetRanges_2 = targetRanges; _i < targetRanges_2.length; _i++) {\n                var range = targetRanges_2[_i];\n                console.info(\"[Paragraph Insertion]\", range);\n            }\n        }\n    };\n    /** Handles inserting a paragraph when a single StaticRange is available */\n    Editor.prototype.handleSingleRangeParagraphInsertion = function (event, targetRange) {\n        event.preventDefault();\n        var selection = window.getSelection();\n        if (!selection)\n            return;\n        // Copying range, deleting content\n        var range = new Range();\n        range.setStart(targetRange.startContainer, targetRange.startOffset);\n        range.setEnd(targetRange.endContainer, targetRange.endOffset);\n        range.deleteContents();\n        // Paragraph creation\n        var newP = document.createElement(\"p\");\n        var startP = this.getEditorLevelParent(targetRange.startContainer);\n        var newPRange = new Range();\n        if (startP.lastChild === null) {\n            var newline = document.createElement(\"br\");\n            newP.appendChild(newline);\n        }\n        else {\n            newPRange.setStart(targetRange.startContainer, targetRange.startOffset);\n            newPRange.setEndAfter(startP.lastChild);\n            var nodes = newPRange.extractContents();\n            if (nodes.textContent === null || nodes.textContent.length === 0) {\n                var newline = document.createElement(\"br\");\n                newP.appendChild(newline);\n            }\n            else {\n                nodes.childNodes.forEach(function (child) {\n                    newP.appendChild(child);\n                });\n            }\n        }\n        startP.insertAdjacentElement(\"afterend\", newP);\n        newPRange.setStartBefore(newP);\n        newPRange.setEndAfter(newP);\n        selection.removeAllRanges();\n        selection.addRange(newPRange);\n        if (this.editor.childElementCount > 1) {\n            this.initialParagraph.setAttribute(\"data-empty\", \"\");\n        }\n    };\n    Editor.prototype.getEditorLevelParent = function (node) {\n        var parentNode = node;\n        while (parentNode.parentNode !== null && !parentNode.parentNode.isEqualNode(this.editor)) {\n            parentNode = parentNode.parentNode;\n        }\n        return parentNode;\n    };\n    return Editor;\n}());\nexports[\"default\"] = Editor;\n\n\n//# sourceURL=webpack://azurs/./src/ts/mod/editor.ts?");

/***/ }),

/***/ "./src/ts/script.ts":
/*!**************************!*\
  !*** ./src/ts/script.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar editor_1 = __importDefault(__webpack_require__(/*! ./mod/editor */ \"./src/ts/mod/editor.ts\"));\nvar Main = /** @class */ (function () {\n    function Main() {\n        this.ini();\n    }\n    Main.prototype.ini = function () {\n        new editor_1.default();\n    };\n    return Main;\n}());\nnew Main();\n\n\n//# sourceURL=webpack://azurs/./src/ts/script.ts?");

/***/ })

/******/ 	});
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ts/script.ts");
/******/ 	
/******/ })()
;