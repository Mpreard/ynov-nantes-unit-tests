const mongoose = require('mongoose');
const Item = require('./Item');
const {createItem} = require('../services/itemService.js')

const itemData = {
    name: "Mael",
    date: new Date('December 17, 1995 03:24:00')
}

it("Create and save item", async () => {
    const validItem = new Item(itemData);
    const savedItem = await createItem(validItem)
    expect(savedItem.name).toBe(itemData.name)
    expect(savedItem.date).toBe(itemData.date)
})