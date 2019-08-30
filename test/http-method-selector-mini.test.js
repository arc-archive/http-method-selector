import {
  fixture,
  assert,
  html,
  nextFrame,
  aTimeout
} from '@open-wc/testing';
import * as sinon from 'sinon/pkg/sinon-esm.js';
import * as MockInteractions from '@polymer/iron-test-helpers/mock-interactions.js';
import '../http-method-selector-mini.js';

describe('<http-method-selector-mini>', function() {
  async function basicFixture() {
    return await fixture(html `
      <http-method-selector-mini></http-method-selector-mini>
    `);
  }

  async function customFixture() {
    return await fixture(html `
      <http-method-selector-mini rendercustom></http-method-selector-mini>
    `);
  }

  function fire(name, detail, node) {
    const e = new CustomEvent(name, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: detail
    });
    (node || document).dispatchEvent(e);
    return e;
  }

  describe('basics', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('can be initialized via createElement', () => {
      const element = document.createElement('http-method-selector-mini');
      assert.ok(element);
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


  describe('Events', () => {
    let element;
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
      element.addEventListener('request-method-changed', function(e) {
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
      element.addEventListener('request-is-payload-changed', function(e) {
        assert.isTrue(e.detail.value);
        done();
      });
      element.method = 'POST';
    });
  });

  describe('Interactions', () => {
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
      await aTimeout();
      assert.equal(spy.callCount, 1);
    });

    it('closes custom method input and restores defaults', async () => {
      const element = await customFixture();
      element.value = 'CUSTOM';
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
