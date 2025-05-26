/*:
 * @target MZ
 * @plugindesc Alters character faces in main battle menu
 * @author Otterkeys
 *
 * @help BattlePortraits.js
 *
 * Changes the face of the actor depending on the resulting state
 *
 * It does not provide plugin commands.
 */

var Imported = Imported || {};
Imported.Otterkeys_BattlePortraits = true;

var Otterkeys = Otterkeys || {};        // main object
Otterkeys.BP = Otterkeys.BP || {};      // plugin object
Otterkeys.BP.pluginName = "BattlePortraits.js";

    //runs every frame


    //deprecated for now
    /*
    Window_BattleStatus.prototype.update = function() {
        Window_StatusBase.prototype.update.call(this); //super class call
        for(let index = 0; index < 4; index++){
            const actor = this.actor(index);
            const rect = this.faceRect(index);
            this.drawActorFace(actor, getActorStateIndex(actor), rect.x, rect.y, rect.width, rect.height);
        }
        if ($gameTemp.isBattleRefreshRequested()) {
            this.preparePartyRefresh();
        }
    };

    //override drawActorFace with function that takes an index for the actor portrait as well
    Window_StatusBase.prototype.drawActorFace = function(actor, index, x, y, width, height) {
        this.drawFace(actor.faceName(), actor.faceIndex() + index, x, y, width, height);
    };

     */
    /**
     *
     * @param actor a given actor
     * @returns {number} portrait index given actor state
     */
    function getActorStateIndex(actor) {
        if (actor != null) {
            if (actor.isDead()) {
                return 5;
            }
            if (actor.isDying()) {
                return 4;
            }

        }
        return 0;
    }


    Otterkeys.BP.Scene_Battle_CommandAttack = Scene_Battle.prototype.commandAttack;
    Scene_Battle.prototype.commandAttack = function() {
        const actor = BattleManager.actor();
        if(actor) {
            if(actor.actorId() == 4){
                actor.setFaceImage("xxx_battle_2", 2);
            } else {
                actor.setFaceImage("xxx_battle_1", (actor.actorId() - 1) * 8 + 2);
            }
            this._statusWindow.refresh();
        }
        Otterkeys.BP.Scene_Battle_CommandAttack.call(this);
    };

    Otterkeys.BP.BattleManager_endAction = BattleManager.prototype.endAction;
    BattleManager.prototype.endAction = function() {
        const actor = BattleManager.actor();
        if(actor) {
            if(actor.actorId() == 4){
                if(actor.isDead()){
                    actor.setFaceImage("xxx_battle_2", 5);
                } else if (actor.isDying()){
                    actor.setFaceImage("xxx_battle_2", 4);
                } else {
                    actor.setFaceImage("xxx_battle_2", 0);
                }

            } else {
                if(actor.isDead()){
                    actor.setFaceImage("xxx_battle_2", actor.actorId * 8 + 5);
                } else if (actor.isDying()){
                    actor.setFaceImage("xxx_battle_2", actor.actorId * 8 + 4);
                } else {
                    actor.setFaceImage("xxx_battle_2", actor.actorId * 8);
                }
            }
            this._statusWindow.refresh();
        }
        Otterkeys.BP.BattleManager_endAction.call(this);
    };
