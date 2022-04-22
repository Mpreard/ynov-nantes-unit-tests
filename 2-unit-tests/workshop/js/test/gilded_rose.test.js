const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("Sword", 10, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Sword");
  });

  // it("should degrade twice as fast when sellIn equal 0", function() {
  //   const gildedRose = new Shop([new Item("Sword", 1, 10)]);

  //   //Loop for 5 days
  //   for (let i = 0; i < 5; i++) {
  //     items = gildedRose.updateQuality();
  //     //console.log(items)
  //   }
  // })


  it("quality shouldn't be negative", function () {
    //sellIn = 5, quality = 3
    const gildedRose = new Shop([new Item("Sword", 5, 3)]);

    //Loop for 5 days
    for (let i = 0; i < 5; i++) {
      items = gildedRose.updateQuality();
      //console.log(items)
    }

    expect(gildedRose.items[0].quality).toBeGreaterThanOrEqual(0);
  });

  it("quality of Aged Brie has to increase", function () {
    startQuality = 5
    const gildedRose = new Shop([new Item("Aged Brie", 5, startQuality)]);

    //Loop for 5 days
    for (let i = 0; i < 5; i++) {
      items = gildedRose.updateQuality();
      //console.log(items)
    }

    expect(gildedRose.items[0].quality).toBeGreaterThan(startQuality);
  });

  it("quality shouldn't be superior than 50", function () {
    startQuality = 49
    const gildedRose = new Shop([new Item("Aged Brie", 5, startQuality)]);

    //Loop for 5 days
    for (let i = 0; i < 5; i++) {
      items = gildedRose.updateQuality();
      //console.log(items)
    }

    expect(gildedRose.items[0].quality).not.toBeGreaterThan(50);
  });
});
