/* ========== NC-MULTI.js ========== */
/* Multi-Slots für RAW / CALC / OP / Text / States */

const NC_MULTI = {
    slots: {},

    // neuen Slot anlegen
    createSlot(id) {
        if (!this.slots[id]) {
            this.slots[id] = {
                raw: null,
                calc: null,
                op: null,
                text: "",
                meta: {}
            };
        }
        return this.slots[id];
    },

    // Slot laden (aus Speicher)
    loadSlot(id) {
        const data = localStorage.getItem("NC_SLOT_" + id);
        if (data) {
            this.slots[id] = JSON.parse(data);
        } else {
            this.createSlot(id);
        }
        return this.slots[id];
    },

    // Slot speichern
    saveSlot(id) {
        if (!this.slots[id]) return;
        localStorage.setItem("NC_SLOT_" + id, JSON.stringify(this.slots[id]));
    },

    // Multi-Edit: Text setzen
    setText(id, text) {
        const slot = this.createSlot(id);
        slot.text = text;
        return slot;
    },

    // Multi-Calc: mit nc-core koppeln
    setCalcFromCore(id, mass, velocity) {
        const slot = this.createSlot(id);
        if (window.NC) {
            const ghost = window.NC.NC_GHOST_SCAN(mass, velocity);
            slot.raw  = window.NC.RAW[3];
            slot.calc = ghost;
        }
        return slot;
    },

    // Multi-OP: Tag setzen
    setOpTag(id, tag) {
        const slot = this.createSlot(id);
        slot.op = tag;
        return slot;
    }
};

// optional global export
window.NC_MULTI = NC_MULTI;

