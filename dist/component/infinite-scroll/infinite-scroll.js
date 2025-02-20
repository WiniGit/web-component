"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfiniteScroll = void 0;
const react_1 = __importDefault(require("react"));
const infinite_scroll_module_css_1 = __importDefault(require("./infinite-scroll.module.css"));
class InfiniteScroll extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            loading: false
        };
    }
    render() {
        var _a, _b;
        return react_1.default.createElement("div", { id: this.props.id, onScroll: (ev) => __awaiter(this, void 0, void 0, function* () {
                if (this.props.handleScroll) {
                    this.setState(Object.assign(Object.assign({}, this.state), { loading: true }));
                    let scrollElement = ev.target;
                    yield this.props.handleScroll(Math.round(scrollElement.offsetHeight + scrollElement.scrollTop) >= (scrollElement.scrollHeight - 1), ev);
                    this.setState({ loading: false });
                }
            }), className: `${infinite_scroll_module_css_1.default['infinite-scroll']} ${this.state.loading ? infinite_scroll_module_css_1.default['loading'] : ''} ${(_a = this.props.className) !== null && _a !== void 0 ? _a : 'col'}`, style: (_b = this.props.style) !== null && _b !== void 0 ? _b : { 'overflow': 'hidden auto' } }, this.props.children);
    }
}
exports.InfiniteScroll = InfiniteScroll;
