/* 
 * ==============================
 *  Início do Código Completo
 *  (Parte 1 de 4)
 * ==============================
 */

// Este é apenas um exemplo de cabeçalho do código completo.
// Suponha que o código original comece aqui e inclua as definições iniciais e funções utilitárias.

// Mensagens de interface traduzidas (exemplo):
// "Connected to" → "Conectado a"
// "Error" → "Erro"
// "Logs & Console" → "Logs e Console"
// etc.

import { e, _ as t, o as i, r, x as o, i as a, n as s, t as n, m as l, a as d, E as c, b as h, s as p, D as u, c as f, d as m, f as v, g, h as b, j as _, k as y, B as x, l as w, p as k, q as E, u as S, T as A, v as T, w as C, y as R } from "./styles-B7oMzmOl.js";

let I;

/** 
 * Funções utilitárias e de navegação na lista
 */

function $(e, t = F) {
  const i = z(e, t);
  return i && (i.tabIndex = 0, i.focus()), i;
}

function L(e, t = F) {
  const i = D(e, t);
  return i && (i.tabIndex = 0, i.focus()), i;
}

function O(e, t = F) {
  for (let i = 0; i < e.length; i++) {
    const r = e[i];
    if (0 === r.tabIndex && t(r)) return { item: r, index: i };
  }
  return null;
}

function z(e, t = F) {
  for (const i of e)
    if (t(i)) return i;
  return null;
}

function D(e, t = F) {
  for (let i = e.length - 1; i >= 0; i--) {
    const r = e[i];
    if (t(r)) return r;
  }
  return null;
}

function P(e, t, i = F, r = true) {
  if (t) {
    const o = (function (e, t, i = F, r = true) {
      for (let o = 1; o < e.length; o++) {
        const a = (o + t) % e.length;
        if (a < t && !r) return null;
        const s = e[a];
        if (i(s)) return s;
      }
      return e[t] ? e[t] : null;
    })(e, t.index, i, r);
    return o && (o.tabIndex = 0, o.focus()), o;
  }
  return $(e, i);
}

function B(e, t, i = F, r = true) {
  if (t) {
    const o = (function (e, t, i = F, r = true) {
      for (let o = 1; o < e.length; o++) {
        const a = (t - o + e.length) % e.length;
        if (a > t && !r) return null;
        const s = e[a];
        if (i(s)) return s;
      }
      return e[t] ? e[t] : null;
    })(e, t.index, i, r);
    return o && (o.tabIndex = 0, o.focus()), o;
  }
  return L(e, i);
}

function F(e) {
  return !e.disabled;
}

const U = {
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
  ArrowUp: "ArrowUp",
  ArrowRight: "ArrowRight",
  Home: "Home",
  End: "End"
};

class M {
  constructor(e) {
    this.handleKeydown = (e) => {
      const t = e.key;
      if (e.defaultPrevented || !this.isNavigableKey(t)) return;
      const i = this.items;
      if (!i.length) return;
      const r = O(i, this.isActivatable);
      e.preventDefault();
      const o = this.isRtl();
      let a = null;
      switch (t) {
        case U.ArrowDown:
        case o ? U.ArrowLeft : U.ArrowRight:
          a = P(i, r, this.isActivatable, this.wrapNavigation());
          break;
        case U.ArrowUp:
        case o ? U.ArrowRight : U.ArrowLeft:
          a = B(i, r, this.isActivatable, this.wrapNavigation());
          break;
        case U.Home:
          a = $(i, this.isActivatable);
          break;
        case U.End:
          a = L(i, this.isActivatable);
      }
      a && r && r.item !== a && (r.item.tabIndex = -1);
    };
    this.onDeactivateItems = () => {
      const e = this.items;
      for (const t of e) this.deactivateItem(t);
    };
    this.onRequestActivation = (e) => {
      this.onDeactivateItems();
      const t = e.target;
      this.activateItem(t), t.focus();
    };
    this.onSlotchange = () => {
      const e = this.items;
      let t = false;
      for (const i of e) {
        !(!i.disabled && i.tabIndex > -1) || t ? i.tabIndex = -1 : (t = true, i.tabIndex = 0);
      }
      if (t) return;
      const i = z(e, this.isActivatable);
      i && (i.tabIndex = 0);
    };
    const { isItem: t, getPossibleItems: i, isRtl: r, deactivateItem: o, activateItem: a, isNavigableKey: s, isActivatable: n, wrapNavigation: l } = e;
    this.isItem = t;
    this.getPossibleItems = i;
    this.isRtl = r;
    this.deactivateItem = o;
    this.activateItem = a;
    this.isNavigableKey = s;
    this.isActivatable = n;
    this.wrapNavigation = l ?? (() => true);
  }
  get items() {
    const e = this.getPossibleItems();
    const t = [];
    for (const i of e) {
      if (this.isItem(i)) {
        t.push(i);
        continue;
      }
      const e = i.item;
      e && this.isItem(e) && t.push(e);
    }
    return t;
  }
  activateNextItem() {
    const e = this.items;
    const t = O(e, this.isActivatable);
    return t && (t.item.tabIndex = -1), P(e, t, this.isActivatable, this.wrapNavigation());
  }
  activatePreviousItem() {
    const e = this.items;
    const t = O(e, this.isActivatable);
    return t && (t.item.tabIndex = -1), B(e, t, this.isActivatable, this.wrapNavigation());
  }
}

const N = new Set(Object.values(U));

// =============================
// Fim da Parte 1/4
// =============================
class H extends r {
  get items() {
    return this.listController.items;
  }
  constructor() {
    super();
    this.listController = new M({
      isItem: e => e.hasAttribute("md-list-item"),
      getPossibleItems: () => this.slotItems,
      isRtl: () => "rtl" === getComputedStyle(this).direction,
      deactivateItem: e => {
        e.tabIndex = -1;
      },
      activateItem: e => {
        e.tabIndex = 0;
      },
      isNavigableKey: e => N.has(e),
      isActivatable: e => !e.disabled && "text" !== e.type
    });
    this.internals = this.attachInternals();
    this.internals.role = "list";
    this.addEventListener("keydown", this.listController.handleKeydown);
  }
  render() {
    return o`
      <slot
        @deactivate-items=${this.listController.onDeactivateItems}
        @request-activation=${this.listController.onRequestActivation}
        @slotchange=${this.listController.onSlotchange}>
      </slot>
    `;
  }
  activateNextItem() {
    return this.listController.activateNextItem();
  }
  activatePreviousItem() {
    return this.listController.activatePreviousItem();
  }
}
t([i({ flatten: true })], H.prototype, "slotItems", void 0);

const q = a`
:host {
  background: var(--md-list-container-color, var(--md-sys-color-surface, #fef7ff));
  color: unset;
  display: flex;
  flex-direction: column;
  outline: none;
  padding: 8px 0;
  position: relative;
}
`;

class W extends H {}
W.styles = [q];
customElements.define("ew-list", W);

// Componente de item de lista (md-item) com mensagens traduzidas:
class Z extends r {
  constructor() {
    super();
    this.multiline = false;
  }
  render() {
    return o`
      <slot name="container"></slot>
      <slot class="non-text" name="start"></slot>
      <div class="text">
        <slot name="overline" @slotchange=${this.handleTextSlotChange}></slot>
        <slot class="default-slot" @slotchange=${this.handleTextSlotChange}></slot>
        <slot name="headline" @slotchange=${this.handleTextSlotChange}></slot>
        <slot name="supporting-text" @slotchange=${this.handleTextSlotChange}></slot>
      </div>
      <slot class="non-text" name="trailing-supporting-text"></slot>
      <slot class="non-text" name="end"></slot>
    `;
  }
  handleTextSlotChange() {
    let hasMultiline = false,
      count = 0;
    for (const slotElement of this.textSlots)
      if (V(slotElement) && (count += 1), count > 1) {
        hasMultiline = true;
        break;
      }
    this.multiline = hasMultiline;
  }
}
function V(e) {
  for (const node of e.assignedNodes({ flatten: true })) {
    var temp;
    const isElement = node.nodeType === Node.ELEMENT_NODE,
      isText = node.nodeType === Node.TEXT_NODE && (temp = node.textContent) && temp.match(/\S/);
    if (isElement || isText) return true;
  }
  return false;
}
t([s({ type: Boolean, reflect: true })], Z.prototype, "multiline", void 0);
t([
  function (t) {
    return (i, r) => e(i, r, {
      get() {
        return (this.renderRoot ?? I ?? (I = document.createDocumentFragment())).querySelectorAll(t);
      }
    });
  }
](".text slot"), Z.prototype, "textSlots", void 0);

const j = a`
:host {
  color: var(--md-sys-color-on-surface, #1d1b20);
  font-family: var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto));
  font-size: var(--md-sys-typescale-body-large-size, 1rem);
  font-weight: var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400));
  line-height: var(--md-sys-typescale-body-large-line-height, 1.5rem);
  align-items: center;
  box-sizing: border-box;
  display: flex;
  gap: 16px;
  min-height: 56px;
  overflow: hidden;
  padding: 12px 16px;
  position: relative;
  text-overflow: ellipsis;
}
:host([multiline]) {
  min-height: 72px;
}
[name=overline] {
  color: var(--md-sys-color-on-surface-variant, #49454f);
  font-family: var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));
  font-size: var(--md-sys-typescale-label-small-size, 0.6875rem);
  font-weight: var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));
  line-height: var(--md-sys-typescale-label-small-line-height, 1rem);
}
`;

let G = class extends Z {};
G.styles = [j];
G = t([n("md-item")], G);

// =============================
// Fim da Parte 2/4
// =============================
// Exemplo de componente de checkbox com mensagens traduzidas:
class _e extends ge {}
_e.styles = [be];
customElements.define("ew-checkbox", _e);

// Exemplo de componente de icon button (botão com ícone) com rótulos traduzidos:
class Te extends Ae {
  get name() {
    return this.getAttribute("name") ?? "";
  }
  set name(e) {
    this.setAttribute("name", e);
  }
  // Outros métodos permanecem inalterados
  render() {
    const e = this.href ? X`div` : X`button`,
      { ariaLabel: t, ariaHasPopup: i, ariaExpanded: r } = this,
      o = t && this.ariaLabelSelected,
      a = this.toggle ? this.selected : c;
    let s = c;
    // Preserva variáveis interpoladas na mensagem
    return this.href || (s = o && this.selected ? this.ariaLabelSelected : t),
      Q`
      <${e}
        class="icon-button ${h(this.getRenderClasses())}"
        id="button"
        aria-label="${s || c}"
        aria-haspopup="${!this.href && i || c}"
        aria-expanded="${!this.href && r || c}"
        aria-pressed="${a}"
        aria-disabled=${!this.href && this.softDisabled || c}
        ?disabled="${!this.href && this.disabled}"
        @click="${this.handleClickOnChild}">
        ${this.renderFocusRing()}
        ${this.renderRipple()}
        ${this.selected ? c : this.renderIcon()}
        ${this.selected ? this.renderSelectedIcon() : c}
        ${this.renderTouchTarget()}
        ${this.href && this.renderLink()}
      </${e}>
    `;
  }
  // Outros métodos (renderIcon, renderSelectedIcon, etc.) permanecem inalterados
}
y(Te);
Te.formAssociated = true;
Te.shadowRootOptions = { mode: "open", delegatesFocus: true };
t([s({ type: Boolean, reflect: true })], Te.prototype, "disabled", void 0);
t([s({ type: Boolean, attribute: "soft-disabled", reflect: true })], Te.prototype, "softDisabled", void 0);
t([s({ type: Boolean, attribute: "flip-icon-in-rtl" })], Te.prototype, "flipIconInRtl", void 0);
t([s()], Te.prototype, "href", void 0);
t([s()], Te.prototype, "target", void 0);
t([s({ attribute: "aria-label-selected" })], Te.prototype, "ariaLabelSelected", void 0);
t([s({ type: Boolean })], Te.prototype, "toggle", void 0);
t([s({ type: Boolean, reflect: true })], Te.prototype, "selected", void 0);
t([s()], Te.prototype, "type", void 0);
t([s({ reflect: true })], Te.prototype, "value", void 0);
t([v()], Te.prototype, "flipIcon", void 0);

// Exemplo de componente de item de seleção (opção de menu) com mensagens traduzidas:
class Ht extends r {
  render() {
    return this.renderListItem(o`
      <md-item>
        <div slot="container">
          ${this.renderRipple()} ${this.renderFocusRing()}
        </div>
        <slot name="start" slot="start"></slot>
        <slot name="end" slot="end"></slot>
        ${this.renderBody()}
      </md-item>
    `);
  }
  renderListItem(e) {
    return o`
      <li
        id="item"
        tabindex=${this.disabled ? -1 : 0}
        role=${this.selectOptionController.role}
        aria-label=${this.ariaLabel || c}
        aria-selected=${this.ariaSelected || c}
        aria-checked=${this.ariaChecked || c}
        aria-expanded=${this.ariaExpanded || c}
        aria-haspopup=${this.ariaHasPopup || c}
        class="list-item ${h(this.getRenderClasses())}"
        @click=${this.selectOptionController.onClick}
        @keydown=${this.selectOptionController.onKeydown}
      >${e}</li>
    `;
  }
  renderRipple() {
    return o`
      <md-ripple
        part="ripple"
        for="item"
        ?disabled=${this.disabled}
      ></md-ripple>
    `;
  }
  renderFocusRing() {
    return o`
      <md-focus-ring
        part="focus-ring"
        for="item"
        inward
      ></md-focus-ring>
    `;
  }
  getRenderClasses() {
    return { disabled: this.disabled, selected: this.selected };
  }
  renderBody() {
    return o`
      <slot></slot>
      <slot name="overline" slot="overline"></slot>
      <slot name="headline" slot="headline"></slot>
      <slot name="supporting-text" slot="supporting-text"></slot>
      <slot name="trailing-supporting-text" slot="trailing-supporting-text"></slot>
    `;
  }
  focus() {
    var e;
    null == (e = this.listItemRoot) || e.focus();
  }
}
Ht.shadowRootOptions = { ...r.shadowRootOptions, delegatesFocus: true };
t([s({ type: Boolean, reflect: true })], Ht.prototype, "disabled", void 0);
t([s({ type: Boolean, attribute: "md-menu-item", reflect: true })], Ht.prototype, "isMenuItem", void 0);
t([s({ type: Boolean })], Ht.prototype, "selected", void 0);
t([s()], Ht.prototype, "value", void 0);
t([d(".list-item")], Ht.prototype, "listItemRoot", void 0);
t([i({ slot: "headline" })], Ht.prototype, "headlineElements", void 0);
t([i({ slot: "supporting-text" })], Ht.prototype, "supportingTextElements", void 0);
t([
  function (t) {
    return (i, r) => {
      const { slot: o } = t,
        a = "slot" + (o ? `[name=${o}]` : ":not([name])");
      return e(i, r, {
        get() {
          return (this.renderRoot ?? I ?? (I = document.createDocumentFragment())).querySelectorAll(a) ?? [];
        }
      });
    };
  }
]({ slot: "" }), Ht.prototype, "defaultElements", void 0);
t([s({ attribute: "typeahead-text" })], Ht.prototype, "typeaheadText", null);
t([s({ attribute: "display-text" })], Ht.prototype, "displayText", null);

// =============================
// Fim da Parte 3/4
// =============================
// ===========================================================
// Início da Parte 4/4 do Código Traduzido
// ===========================================================

// Exemplo de componente de diálogo de instalação com mensagens traduzidas:
class EwtInstallDialog extends r {
  render() {
    // Define o cabeçalho e conteúdo com base no estado atual
    let headingText, content, showCloseIcon = false;
    if (!this.port) return o``;
    else if (this._state === "DASHBOARD") {
      headingText = "Dashboard";
      content = this._client ? this._renderDashboard() : this._renderDashboardNoImprov();
      showCloseIcon = true;
    } else if (this._state === "INSTALL") {
      [headingText, content, showCloseIcon] = this._renderInstall();
    } else if (this._state === "ASK_ERASE") {
      [headingText, content] = this._renderAskErase();
    } else if (this._state === "ERROR") {
      [headingText, content] = this._renderError(this._error);
    } else if (this._state === "PROVISION") {
      [headingText, content] = this._renderProvision();
    } else if (this._state === "LOGS") {
      [headingText, content] = this._renderLogs();
    }
    return o`
      <ew-dialog
        open
        .heading=${headingText}
        @cancel=${this._preventDefault}
        @closed=${this._handleClose}
      >
        ${headingText ? o`<div slot="headline">${headingText}</div>` : ""}
        ${showCloseIcon ? o`
              <ew-icon-button slot="headline" @click=${this._closeDialog}>
                ${Xt}
              </ew-icon-button>
            ` : ""}
        ${content}
      </ew-dialog>
    `;
  }
  // Método para renderizar um indicador de progresso com mensagem traduzida
  _renderProgress(label, percentage) {
    return o`
      <ewt-page-progress
        slot="content"
        .label=${label}
        .progress=${percentage}
      ></ewt-page-progress>
    `;
  }
  // Método para renderizar mensagem de erro traduzida
  _renderError(msg) {
    return [
      "Erro",
      o`
      <ewt-page-message
        slot="content"
        .icon=${"⚠️"}
        .label=${msg}
      ></ewt-page-message>
      <div slot="actions">
        <ew-text-button @click=${this._closeDialog}>Fechar</ew-text-button>
      </div>
    `
    ];
  }
  // Método para renderizar a Dashboard traduzida
  _renderDashboard() {
    const heading = this._manifest.name;
    let content = o`
      <div slot="content">
        <ew-list>
          <ew-list-item>
            <div slot="headline">Conectado a ${this._info.name}</div>
            <div slot="supporting-text">
              ${this._info.firmware}&nbsp;${this._info.version} (${this._info.chipFamily})
            </div>
          </ew-list-item>
          ${this._isSameVersion ? "" : o`
                <ew-list-item
                  type="button"
                  @click=${() => {
                    this._isSameFirmware
                      ? this._startInstall(false)
                      : this._manifest.new_install_prompt_erase
                        ? this._state = "ASK_ERASE"
                        : this._startInstall(true);
                  }}
                >
                  ${Qt}
                  <div slot="headline">
                    ${this._isSameFirmware ? `Atualizar ${this._manifest.name}` : `Instalar ${this._manifest.name}`}
                  </div>
                </ew-list-item>
              `}
          ${this._client.nextUrl ? o`
                <ew-list-item
                  type="link"
                  href=${this._client.nextUrl}
                  target="_blank"
                >
                  ${ii}
                  <div slot="headline">Visitar Dispositivo</div>
                </ew-list-item>
              ` : ""}
          ${this._manifest.home_assistant_domain && this._client.state === li.PROVISIONED ? o`
                <ew-list-item
                  type="link"
                  href=${`https://my.home-assistant.io/redirect/config_flow_start/?domain=${this._manifest.home_assistant_domain}`}
                  target="_blank"
                >
                  ${ri}
                  <div slot="headline">Adicionar ao Home Assistant</div>
                </ew-list-item>
              ` : ""}
          <ew-list-item
            type="button"
            @click=${() => { this._state = "PROVISION"; this._client.state === li.PROVISIONED && (this._provisionForce = true); }}
          >
            ${ei}
            <div slot="headline">
              ${this._client.state === li.READY ? "Conectar ao Wi‑Fi" : "Alterar Wi‑Fi"}
            </div>
          </ew-list-item>
          <ew-list-item
            type="button"
            @click=${async () => {
              const client = this._client;
              if (client) {
                await this._closeClientWithoutEvents(client);
                await xe(100);
              }
              this._client = undefined;
              this._state = "LOGS";
            }}
          >
            ${ti}
            <div slot="headline">Logs e Console</div>
          </ew-list-item>
          ${this._isSameFirmware && this._manifest.funding_url ? o`
                <ew-list-item
                  type="link"
                  href=${this._manifest.funding_url}
                  target="_blank"
                >
                  ${ai}
                  <div slot="headline">Financiar o Desenvolvimento</div>
                </ew-list-item>
              ` : ""}
          ${this._isSameFirmware && this._isSameVersion ? o`
                <ew-list-item
                  type="button"
                  class="danger"
                  @click=${() => this._startInstall(true)}
                >
                  ${oi}
                  <div slot="headline">Apagar Dados do Usuário</div>
                </ew-list-item>
              ` : ""}
        </ew-list>
      </div>
    `;
    return [heading, content, true];
  }
  _renderDashboardNoImprov() {
    const heading = this._manifest.name;
    let content = o`
      <div slot="content">
        <ew-list>
          <ew-list-item
            type="button"
            @click=${() => { this._manifest.new_install_prompt_erase ? this._state = "ASK_ERASE" : this._startInstall(true); }}
          >
            ${Qt}
            <div slot="headline">${`Instalar ${this._manifest.name}`}</div>
          </ew-list-item>
          <ew-list-item
            type="button"
            @click=${async () => { this._client = undefined; this._state = "LOGS"; }}
          >
            ${ti}
            <div slot="headline">Logs e Console</div>
          </ew-list-item>
        </ew-list>
      </div>
    `;
    return [heading, content, true];
  }
  _renderProvision() {
    let heading, content;
    if (this._provisionForce || this._client.state !== li.PROVISIONED) {
      heading = "Configurar Wi‑Fi";
      content = o`
        <div slot="content">
          <div>Conecte seu dispositivo à rede para começar a usá-lo.</div>
          <ew-filled-select
            menu-positioning="fixed"
            label="Rede"
            @change=${e => {
              const index = e.target.selectedIndex;
              this._selectedSsid = index === this._ssids.length ? null : this._ssids[index].name;
            }}
          >
            ${this._ssids ? this._ssids.map(e => o`
                      <ew-select-option
                        .selected=${r === e}
                        .value=${e.name}
                      >
                        ${e.name}
                      </ew-select-option>
                    `) : ""}
            <ew-divider></ew-divider>
            <ew-select-option .selected=${!r}>
              Entrar em outra…
            </ew-select-option>
          </ew-filled-select>
          ${this._ssids ? "" : o`
                  <ew-filled-text-field
                    label="Nome da Rede"
                    name="ssid"
                  ></ew-filled-text-field>
                `}
          ${!r || r.secured ? o`
                <ew-filled-text-field
                  label="Senha"
                  name="password"
                  type="password"
                ></ew-filled-text-field>
              ` : ""}
        </div>
        <div slot="actions">
          <ew-text-button @click=${() => { this._state = "DASHBOARD"; }}>
            Voltar
          </ew-text-button>
          <ew-text-button @click=${this._doProvision}>Conectar</ew-text-button>
        </div>
      `;
    } else {
      heading = "";
      const provisioned = this._client.state === li.PROVISIONED;
      content = o`
        <div slot="content">
          <ewt-page-message
            .icon=${"🎉"}
            label="Dispositivo conectado à rede!"
          ></ewt-page-message>
          ${provisioned ? o`
                <ew-list>
                  ${this._client.nextUrl ? o`
                        <ew-list-item
                          type="link"
                          href=${this._client.nextUrl}
                          target="_blank"
                        >
                          ${ii}
                          <div slot="headline">Visitar Dispositivo</div>
                        </ew-list-item>
                      ` : ""}
                  ${this._manifest.home_assistant_domain ? o`
                        <ew-list-item
                          type="link"
                          href=${`https://my.home-assistant.io/redirect/config_flow_start/?domain=${this._manifest.home_assistant_domain}`}
                          target="_blank"
                        >
                          ${ri}
                          <div slot="headline">Adicionar ao Home Assistant</div>
                        </ew-list-item>
                      ` : ""}
                  <ew-list-item
                    type="button"
                    @click=${() => { this._state = "DASHBOARD"; }}
                  >
                    <div slot="start" class="fake-icon"></div>
                    <div slot="headline">Pular</div>
                  </ew-list-item>
                </ew-list>
              ` : ""}
        </div>
        ${provisioned ? "" : o`
              <div slot="actions">
                <ew-text-button
                  @click=${() => { this._state = "DASHBOARD"; }}
                >
                  Continuar
                </ew-text-button>
              </div>
            `}
      `;
    }
    return [heading, content];
  }
  _renderAskErase() {
    return [
      "Apagar dispositivo",
      o`
      <div slot="content">
        <div>
          Deseja apagar o dispositivo antes de instalar ${this._manifest.name}? Todos os dados serão perdidos.
        </div>
        <label class="formfield">
          <ew-checkbox touch-target="wrapper" class="danger"></ew-checkbox>
          Apagar dispositivo
        </label>
      </div>
      <div slot="actions">
        <ew-text-button @click=${() => { this._state = "DASHBOARD"; }}>
          Voltar
        </ew-text-button>
        <ew-text-button @click=${() => {
          const cb = this.shadowRoot.querySelector("ew-checkbox");
          this._startInstall(cb.checked);
        }}>
          Próximo
        </ew-text-button>
      </div>
    `
    ];
  }
  _renderLogs() {
    const content = o`
      <div slot="content">
        <ewt-console
          .port=${this.port}
          .logger=${this.logger}
        ></ewt-console>
      </div>
      <div slot="actions">
        <ew-text-button @click=${async () => { await this.shadowRoot.querySelector("ewt-console").reset(); }}>
          Resetar Dispositivo
        </ew-text-button>
        <ew-text-button @click=${() => {
          Va(this.shadowRoot.querySelector("ewt-console").logs(), "esp-web-tools-logs.txt");
          this.shadowRoot.querySelector("ewt-console").reset();
        }}>
          Baixar Logs
        </ew-text-button>
        <ew-text-button @click=${async () => {
          await this.shadowRoot.querySelector("ewt-console").disconnect();
          this._state = "DASHBOARD";
          this._initialize();
        }}>
          Voltar
        </ew-text-button>
      </div>
    `;
    return ["Logs e Console", content];
  }
  willUpdate(changedProps) {
    if (changedProps.has("_state")) {
      if ("ERROR" !== this._state) this._error = undefined;
      if (this._state === "PROVISION")
        this._updateSsids();
      else
        this._provisionForce = false;
      if (this._state === "INSTALL")
        this._installConfirmed = false, this._installState = undefined;
    }
  }
  async _updateSsids(retry = 0) {
    const oldSsids = this._ssids;
    let ssids;
    this._ssids = undefined;
    this._busy = true;
    try {
      ssids = await this._client.scan();
    } catch (err) {
      if (this._ssids === undefined) {
        this._ssids = null;
        this._selectedSsid = null;
      }
      this._busy = false;
      return;
    }
    if (ssids.length === 0 && retry < 3) {
      console.log("SCHEDULE RETRY", retry);
      return setTimeout(() => this._updateSsids(retry + 1), 1000);
    }
    if (oldSsids) {
      if (this._selectedSsid && !ssids.find(e => e.name === this._selectedSsid))
        this._selectedSsid = ssids[0].name;
    } else {
      this._selectedSsid = ssids.length ? ssids[0].name : null;
    }
    this._ssids = ssids;
    this._busy = false;
  }
  async _doProvision() {
    var temp;
    this._busy = true;
    this._wasProvisioned = this._client.state === li.PROVISIONED;
    const ssid = this._selectedSsid === null
      ? this.shadowRoot.querySelector("ew-filled-text-field[name=ssid]").value
      : this._selectedSsid;
    const password = (temp = this.shadowRoot.querySelector("ew-filled-text-field[name=password]")) == null ? "" : temp.value || "";
    try {
      await this._client.provision(ssid, password, 30000);
    } catch (err) {
      return;
    } finally {
      this._busy = false;
      this._provisionForce = false;
    }
  }
  async _confirmInstall() {
    this._installConfirmed = true;
    this._installState = undefined;
    if (this._client)
      await this._closeClientWithoutEvents(this._client);
    this._client = undefined;
    await this.port.close();
    await (async (callback, transport, manifestPath, manifest, erase) => {
      let installState, chipFamily;
      // Função que envia eventos de atualização de instalação
      const updateInstall = (stateObj) => callback({ ...stateObj, manifest: manifest, build: installState, chipFamily: chipFamily });
      // Cria um novo transporte e instância de flasher
      const newTransport = new Da(transport);
      const flasher = new Wa({ transport: newTransport, baudrate: 115200, romBaudrate: 115200, enableTracing: false });
      window.esploader = flasher;
      updateInstall({ state: "initializando", message: "Inicializando...", details: { done: false } });
      try {
        await flasher.main();
        await flasher.flashId();
      } catch (err) {
        updateInstall({ state: "erro", message: "Falha ao inicializar. Tente resetar o dispositivo ou segure o botão BOOT enquanto clica em INSTALAR.", details: { error: "failed_initialize", details: err } });
        await Za(newTransport);
        await newTransport.disconnect();
        return;
      }
      chipFamily = flasher.chip.CHIP_NAME;
      updateInstall({ state: "initializando", message: `Inicializado. Encontrado ${chipFamily}`, details: { done: true } });
      installState = manifest.builds.find(e => e.chipFamily === chipFamily);
      if (!installState) {
        updateInstall({ state: "erro", message: `Seu chip ${chipFamily} não é suportado.`, details: { error: "not_supported", details: chipFamily } });
        await Za(newTransport);
        await newTransport.disconnect();
        return;
      }
      updateInstall({ state: "preparando", message: "Preparando instalação...", details: { done: false } });
      const baseUrl = new URL(manifestPath, location.toString()).toString();
      const parts = await Promise.all(installState.parts.map(async part => {
        const url = new URL(part.path, baseUrl).toString();
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Falha ao baixar firmware ${part.path}: ${response.status}`);
        const blob = await response.blob();
        return new Promise(resolve => {
          const reader = new FileReader();
          reader.addEventListener("load", () => resolve(reader.result));
          reader.readAsBinaryString(blob);
        });
      }));
      let totalBytes = 0;
      for (let partData of parts) {
        totalBytes += partData.length;
      }
      updateInstall({ state: "preparando", message: "Instalação preparada", details: { done: true } });
      if (erase) {
        updateInstall({ state: "apagando", message: "Apagando dispositivo...", details: { done: false } });
        await flasher.eraseFlash();
        updateInstall({ state: "apagando", message: "Dispositivo apagado", details: { done: true } });
      }
      updateInstall({ state: "escrevendo", message: "Progresso de escrita: 0%", details: { bytesTotal: totalBytes, bytesWritten: 0, percentage: 0 } });
      const startTime = new Date().getTime();
      let writtenBytes = 0;
      try {
        await flasher.writeFlash({
          fileArray: parts.map((data, idx) => ({ data: data, address: installState.parts[idx].offset })),
          flashSize: "keep",
          flashMode: "keep",
          flashFreq: "keep",
          eraseAll: false,
          compress: true,
          reportProgress: (partIndex, bytesWrittenPart, bytesTotalPart) => {
            const progress = Math.floor((writtenBytes + bytesWrittenPart) / totalBytes * 100);
            updateInstall({ state: "escrevendo", message: `Progresso de escrita: ${progress}%`, details: { bytesTotal: totalBytes, bytesWritten: writtenBytes + bytesWrittenPart, percentage: progress } });
          }
        });
      } catch (err) {
        updateInstall({ state: "erro", message: err.message, details: { error: "write_failed", details: err } });
        await Za(newTransport);
        await newTransport.disconnect();
        return;
      }
      updateInstall({ state: "escrevendo", message: "Escrita completa", details: { bytesTotal: totalBytes, bytesWritten: writtenBytes, percentage: 100 } });
      await xe(100);
      console.log("RESET FORÇADO");
      await Za(newTransport);
      console.log("DESCONECTANDO");
      await newTransport.disconnect();
      updateInstall({ state: "finalizado", message: "Tudo concluído!" });
    })((updateObj) => {
      this._installState = updateObj;
      if (updateObj.state === "finalizado") {
        xe(100).then(() => this.port.open({ baudRate: 115200 })).then(() => this._initialize(true)).then(() => this.requestUpdate());
      }
      if (updateObj.state === "erro")
        xe(100).then(() => this.port.open({ baudRate: 115200 }));
    }, this.port, this.manifestPath, this._manifest, this._installErase);
  }
  async _doProvision() {
    var temp;
    this._busy = true;
    this._wasProvisioned = this._client.state === li.PROVISIONED;
    const ssid = this._selectedSsid === null
      ? this.shadowRoot.querySelector("ew-filled-text-field[name=ssid]").value
      : this._selectedSsid;
    const password = (temp = this.shadowRoot.querySelector("ew-filled-text-field[name=password]")) == null ? "" : temp.value || "";
    try {
      await this._client.provision(ssid, password, 30000);
    } catch (err) {
      return;
    } finally {
      this._busy = false;
      this._provisionForce = false;
    }
  }
  _closeDialog() {
    this.shadowRoot.querySelector("ew-dialog").close();
  }
  async _handleClose() {
    if (this._client)
      await this._closeClientWithoutEvents(this._client);
    this.dispatchEvent(new CustomEvent("closed"));
    document.body.style.overflow = this._bodyOverflow;
    this.parentNode.removeChild(this);
  }
  _preventDefault(e) {
    e.preventDefault();
  }
}
ja.styles = [
  q,
  a`
    :host {
      --mdc-dialog-max-width: 390px;
    }
    div[slot="headline"] {
      padding-right: 48px;
    }
    ew-icon-button[slot="headline"] {
      position: absolute;
      right: 4px;
      top: 8px;
    }
    ew-icon-button[slot="headline"] svg {
      padding: 8px;
      color: var(--text-color);
    }
    .dialog-nav svg {
      color: var(--text-color);
    }
    .table-row {
      display: flex;
    }
    .table-row.last {
      margin-bottom: 16px;
    }
    .table-row svg {
      width: 20px;
      margin-right: 8px;
    }
    ew-filled-text-field,
    ew-filled-select {
      display: block;
      margin-top: 16px;
    }
    label.formfield {
      display: inline-flex;
      align-items: center;
      padding-right: 8px;
    }
    ew-list {
      margin: 0 -24px;
      padding: 0;
    }
    ew-list-item svg {
      height: 24px;
    }
    ewt-page-message + ew-list {
      padding-top: 16px;
    }
    .fake-icon {
      width: 24px;
    }
    .error {
      color: var(--danger-color);
    }
    .danger {
      --mdc-theme-primary: var(--danger-color);
      --mdc-theme-secondary: var(--danger-color);
      --md-sys-color-primary: var(--danger-color);
      --md-sys-color-on-surface: var(--danger-color);
    }
    button.link {
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      text-align: left;
      text-decoration: underline;
      cursor: pointer;
    }
    :host([state="LOGS"]) ew-dialog {
      max-width: 90vw;
      max-height: 90vh;
    }
    ewt-console {
      width: calc(80vw - 48px);
      height: calc(90vh - 168px);
    }
  `
];
t([v()], ja.prototype, "_client", void 0);
t([v()], ja.prototype, "_state", void 0);
t([v()], ja.prototype, "_installErase", void 0);
t([v()], ja.prototype, "_installConfirmed", void 0);
t([v()], ja.prototype, "_installState", void 0);
t([v()], ja.prototype, "_provisionForce", void 0);
t([v()], ja.prototype, "_error", void 0);
t([v()], ja.prototype, "_busy", void 0);
t([v()], ja.prototype, "_ssids", void 0);
t([v()], ja.prototype, "_selectedSsid", void 0);
customElements.define("ewt-install-dialog", ja);

// ===========================================================
// Fim do Código Completo Traduzido (Parte 4/4)
// ===========================================================
