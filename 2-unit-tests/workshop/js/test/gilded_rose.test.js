const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  // - Une fois que la date de péremption est passée, la qualité se dégrade deux fois plus rapidement.
  it("should lose double quality when sellIn is 0", function() {
    const gildedRose = new Shop([new Item("foo", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
  });

  // - La qualité `quality` d'un produit ne peut jamais être négative.
  it("should not have a negative quality", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
  });

  // - La qualité d'un produit n'est jamais de plus de 50.
  it("should not have a quality over 50", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
  });

  // - "Aged Brie" augmente sa qualité `quality` plus le temps passe.
  it("'Aged Brie' should gain quality over time", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);
  });

  // - "Sulfuras", étant un objet légendaire, n'a pas de date de péremption et ne perd jamais en qualité `quality`
  it("should not lose quality if item is 'Sulfuras, Hand of Ragnaros'", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(0);
  });

  // - "Backstage passes", comme le "Aged Brie", augmente sa qualité `quality` plus le temps passe (`sellIn`) ; La qualité augmente de 2 quand il reste 10 jours ou moins et de 3 quand il reste 5 jours ou moins, mais la qualité tombe à 0 après le concert.

  it("Backstage passes", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 12, 20)]);
    let items = gildedRose.updateQuality();
    
    expect(items[0].quality).toBe(21);

    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();


    expect(items[0].quality).toBe(30);
    expect(items[0].sellIn).toBe(6);

    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();


    expect(items[0].sellIn).toBe(0);
  });
});
