import {
  fixture,
  assert,
  html,
  nextFrame,
  aTimeout
} from '@open-wc/testing';
import * as sinon from 'sinon';
import * as MockInteractions from '@polymer/iron-test-helpers/mock-interactions.js';
import '../http-method-selector.js';

/** @typedef {import('@anypoint-web-components/anypoint-radio-button/src/AnypointRadioButtonElement').AnypointRadioButtonElement} AnypointRadioButtonElement */
/** @typedef {import('../index').HttpMethodSelectorElement} HttpMethodSelectorElement */

describe('HttpMethodSelectorElement', () => {
  /**
   * @returns {Promise<HttpMethodSelectorElement>}
   */
  async function basicFixture() {
    return fixture(html `
      <http-method-selector></http-method-selector>
    `);
  }

  /**
   * @returns {Promise<HttpMethodSelectorElement>}
   */
  async function customFixture() {
    return fixture(html `
      <http-method-selector rendercustom></http-method-selector>
    `);
  }

  /**
   * @returns {Promise<HttpMethodSelectorElement>}
   */
  async function readonlyFixture() {
    return fixture(html `
      <http-method-selector readonly></http-method-selector>
    `);
  }

  function fire(name, detail, node) {
    const e = new CustomEvent(name, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail
    });
    (node || document).dispatchEvent(e);
    return e;
  }

  describe('basics', () => {
    let element = /** @type HttpMethodSelectorElement */ (null);
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('can be initialized via createElement', () => {
      const inst = document.createElement('http-method-selector');
      assert.ok(inst);
    });

    it('isPayload is false for GET method', () => {
      assert.isFalse(element.isPayload);
    });

    it('isPayload is false for HEAD method', () => {
      element.method = 'HEAD';
      assert.isFalse(element.isPayload);
    });

    it('isPayload is true for other methods', () => {
      element.method = 'PUT';
      assert.isTrue(element.isPayload);
      element.method = 'POST';
      assert.isTrue(element.isPayload);
      element.method = 'DELETE';
      assert.isTrue(element.isPayload);
      element.method = 'PATCH';
      assert.isTrue(element.isPayload);
    });

    it('isPayload is true for non-standard method', () => {
      element.method = 'X-METHOD';
      assert.isTrue(element.isPayload);
    });

    it('renderCustom is false for standard method', () => {
      element.method = 'HEAD';
      assert.isFalse(element.renderCustom);
    });

    it('renderCustom is true for non-standard method', () => {
      element.method = 'X-METHOD';
      assert.isTrue(element.renderCustom);
    });
  });


  describe('events', () => {
    let element = /** @type HttpMethodSelectorElement */ (null);
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('request-is-payload-status is handled', () => {
      const e = fire('request-is-payload-status', {});
      assert.isTrue(e.defaultPrevented);
      assert.isFalse(e.detail.value);
    });

    it('request-method-changed is handled', () => {
      fire('request-method-changed', {
        value: 'POST'
      });
      assert.equal(element.method, 'POST');
    });

    it('request-method-changed does not fire request-method-changed event', () => {
      const spy = sinon.stub();
      element.addEventListener('request-method-changed', spy);
      fire('request-method-changed', {
        value: 'POST'
      });
      assert.isFalse(spy.called);
    });

    it('request-method-changed is fired for method change', () => {
      const spy = sinon.stub();
      element.addEventListener('request-method-changed', spy);
      element.method = 'POST';
      assert.isTrue(spy.calledOnce);
    });

    it('request-method-changed contains a value', (done) => {
      element.addEventListener('request-method-changed', (e) => {
        // @ts-ignore
        assert.equal(element.method, e.detail.value);
        done();
      });
      element.method = 'POST';
    });

    it('request-is-payload-changed is fired', () => {
      const spy = sinon.stub();
      element.addEventListener('request-is-payload-changed', spy);
      element.method = 'POST';
      assert.isTrue(spy.calledOnce);
    });

    it('request-is-payload-changed contains a value', (done) => {
      element.addEventListener('request-is-payload-changed', (e) => {
        // @ts-ignore
        assert.isTrue(e.detail.value);
        done();
      });
      element.method = 'POST';
    });
  });

  describe('Interactions', () => {
    it('changes selection when radio button click', async () => {
      const element = await basicFixture();
      const node = element.shadowRoot.querySelector('anypoint-radio-button[name="PUT"]');
      MockInteractions.tap(node);

      assert.equal(element.method, 'PUT');
    });

    it('radio button changes selection on method change', async () => {
      const element = await basicFixture();
      element.method = 'PUT';
      await nextFrame();
      const node = /** @type AnypointRadioButtonElement */ (element.shadowRoot.querySelector('anypoint-radio-button[name="PUT"]'));
      assert.isTrue(node.checked);
    });

    it('does not change selection when readonly', async () => {
      const element = await readonlyFixture();
      const node = element.shadowRoot.querySelector('anypoint-radio-button[name="PUT"]');
      MockInteractions.tap(node);

      assert.equal(element.method, 'GET');
    });

    it('custom method input changes method value', async () => {
      const element = await customFixture();
      const input = element.inputElement;
      input.value = 'CUS';
      MockInteractions.keyDownOn(input, 13, [], 'Enter');
      assert.equal(element.method, 'CUS');
    });

    it('validates custom method input when change event', async () => {
      const element = await customFixture();
      const input = element.inputElement;
      const spy = sinon.spy(input, 'validate');
      fire('request-method-changed', {
        value: 'POST'
      });
      await aTimeout(0);
      assert.equal(spy.callCount, 1);
    });

    it('closes custom method input and restores defaults', async () => {
      const element = await customFixture();
      element.method = 'CUSTOM';
      await nextFrame();
      const button = element.shadowRoot.querySelector('anypoint-icon-button');
      MockInteractions.tap(button);
      await nextFrame();
      assert.equal(element.method, 'GET');
      assert.isFalse(element.renderCustom);
    });

    it('sets methodMenuOpened when dropdown opens', async () => {
      const element = await basicFixture();
      const node = element.shadowRoot.querySelector('anypoint-dropdown-menu');
      MockInteractions.tap(node);
      assert.isTrue(element.methodMenuOpened);
    });
  });

  describe('onmethod', () => {
    let element = /** @type HttpMethodSelectorElement */ (null);
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Getter returns previously registered handler', () => {
      assert.isUndefined(element.onmethod);
      const f = () => {};
      element.onmethod = f;
      assert.isTrue(element.onmethod === f);
    });

    it('Calls registered function', () => {
      let called = false;
      const f = () => {
        called = true;
      };
      element.onmethod = f;
      element.method = 'PUT';
      element.onmethod = null;
      assert.isTrue(called);
    });

    it('Unregisteres old function', () => {
      let called1 = false;
      let called2 = false;
      const f1 = () => {
        called1 = true;
      };
      const f2 = () => {
        called2 = true;
      };
      element.onmethod = f1;
      element.onmethod = f2;
      element.method = 'PUT';
      element.onmethod = null;
      assert.isFalse(called1);
      assert.isTrue(called2);
    });
  });

  describe('onispayload', () => {
    let element = /** @type HttpMethodSelectorElement */ (null);
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Getter returns previously registered handler', () => {
      assert.isUndefined(element.onispayload);
      const f = () => {};
      element.onispayload = f;
      assert.isTrue(element.onispayload === f);
    });

    it('Calls registered function', () => {
      let called = false;
      const f = () => {
        called = true;
      };
      element.onispayload = f;
      element.method = 'PUT';
      element.onispayload = null;
      assert.isTrue(called);
    });

    it('Unregisteres old function', () => {
      let called1 = false;
      let called2 = false;
      const f1 = () => {
        called1 = true;
      };
      const f2 = () => {
        called2 = true;
      };
      element.onispayload = f1;
      element.onispayload = f2;
      element.method = 'PUT';
      element.onispayload = null;
      assert.isFalse(called1);
      assert.isTrue(called2);
    });
  });

  describe('a11y', () => {
    it('is accessible for default state', async () => {
      const element = await basicFixture();
      await assert.isAccessible(element);
    });

    it('is accessible for custom method state', async () => {
      const element = await customFixture();
      await assert.isAccessible(element);
    });
  });

  describe('compatibility mode', () => {
    it('sets compatibility on item when setting legacy', async () => {
      const element = await basicFixture();
      element.legacy = true;
      assert.isTrue(element.legacy, 'legacy is set');
      assert.isTrue(element.compatibility, 'compatibility is set');
    });

    it('returns compatibility value from item when getting legacy', async () => {
      const element = await basicFixture();
      element.compatibility = true;
      assert.isTrue(element.legacy, 'legacy is set');
    });
  });
});
