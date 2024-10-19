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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar Editor = /** @class */ (function () {\n    function Editor() {\n        this.editor = document.querySelector(\"#editor\");\n        this.initialParagraph = document.querySelector(\"#initial-paragraph\");\n        this.ini();\n    }\n    Editor.prototype.ini = function () {\n        this.handleEditorInput();\n    };\n    /** @description Handles inputing / typing in the editor */\n    Editor.prototype.handleEditorInput = function () {\n        var _this = this;\n        this.editor.addEventListener(\"beforeinput\", function (e) {\n            switch (e.inputType) {\n                case \"insertParagraph\":\n                    {\n                        e.preventDefault();\n                        _this.handleParagraphInsertion();\n                    }\n                    break;\n                case \"deleteContentBackward\":\n                    {\n                        _this.handleDeletion(e);\n                    }\n                    break;\n            }\n        });\n    };\n    /** @description Normalises paragraph insertions using the Selection and Range APIs */\n    Editor.prototype.handleParagraphInsertion = function () {\n        var selection = window.getSelection();\n        if (!selection)\n            return;\n        var selectionRange = selection.getRangeAt(0);\n        if (!selectionRange)\n            return;\n        selectionRange.deleteContents();\n        var selectionAnchor = selection.anchorNode;\n        var selectionFocus = selection.focusNode;\n        if (selectionAnchor === null || selectionFocus === null)\n            return;\n        var selectionAnchorParagraph = this.getParentAtEditorLevel(selectionAnchor);\n        var lastChild = selectionAnchorParagraph.lastChild;\n        var newParagraph = document.createElement(\"p\");\n        if (lastChild === null) {\n            var newline = document.createElement(\"br\");\n            newParagraph.appendChild(newline);\n            selectionAnchorParagraph.insertAdjacentElement(\"afterend\", newParagraph);\n            var positionNewParagraphRange = new Range();\n            positionNewParagraphRange.setStartBefore(newParagraph);\n            positionNewParagraphRange.setEndBefore(newParagraph);\n            selection.removeAllRanges();\n            selection.addRange(positionNewParagraphRange);\n        }\n        else {\n            // Here we select the remaining elements after the cursor to be moved in the next\n            // line. Using lastChild allows us to set the end of the selection.\n            var moveRange = new Range();\n            moveRange.setStart(selectionRange.startContainer, selectionRange.startOffset);\n            moveRange.setEndAfter(lastChild);\n            var nodes = moveRange.extractContents();\n            // An element with no text cannot be focused on, so we use a <br>\n            if (nodes.textContent === null || nodes.textContent.length === 0) {\n                var newline = document.createElement(\"br\");\n                newParagraph.appendChild(newline);\n            }\n            else {\n                nodes.childNodes.forEach(function (child) {\n                    newParagraph.append(child);\n                });\n            }\n            selectionAnchorParagraph.insertAdjacentElement(\"afterend\", newParagraph);\n            moveRange.setStartBefore(newParagraph);\n            moveRange.setEndBefore(newParagraph);\n            selection.removeAllRanges();\n            selection.addRange(moveRange);\n        }\n        // Setting the position is necessary as trying to add more empty paragraphs\n        // results in the editor being the anchor.\n        selection.setPosition(newParagraph);\n    };\n    /** @description Handles deletion */\n    Editor.prototype.handleDeletion = function (inputEvent) {\n        var _a, _b, _c, _d;\n        var selection = window.getSelection();\n        if (!selection)\n            return;\n        var anchorNode = selection.anchorNode;\n        if (!anchorNode)\n            return;\n        var selectionAnchorParagraph = this.getParentAtEditorLevel(anchorNode);\n        // Prevent the initial paragraph from being deleted\n        if (selectionAnchorParagraph.isSameNode(this.initialParagraph)) {\n            var childNodes_1 = this.initialParagraph.childNodes;\n            if (childNodes_1.length === 1 && ((_b = (_a = this.initialParagraph.firstChild) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.length) === 0) {\n                inputEvent.preventDefault();\n                this.initialParagraph.firstChild.remove();\n            }\n            else if (((_c = this.initialParagraph.textContent) === null || _c === void 0 ? void 0 : _c.length) === 0) {\n                inputEvent.preventDefault();\n            }\n            // Remove automatically inserted <br> element\n            if (childNodes_1.length === 1 && ((_d = this.initialParagraph.textContent) === null || _d === void 0 ? void 0 : _d.length) === 1) {\n                setTimeout(function () {\n                    if (!(childNodes_1.length === 1 && childNodes_1[0].nodeName === \"BR\"))\n                        return;\n                    childNodes_1[0].remove();\n                });\n            }\n        }\n    };\n    /** @description Fetches a child paragraph from the editor based on a node within the editor */\n    Editor.prototype.getParentAtEditorLevel = function (node) {\n        var parentNode = node;\n        while (parentNode.parentNode !== null && !parentNode.parentNode.isEqualNode(this.editor)) {\n            parentNode = parentNode.parentNode;\n        }\n        return parentNode;\n    };\n    return Editor;\n}());\nexports[\"default\"] = Editor;\n\n\n//# sourceURL=webpack://azurs/./src/ts/mod/editor.ts?");

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