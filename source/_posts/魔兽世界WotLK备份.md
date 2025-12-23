---
title: 魔兽世界WotLK备份
categories: 游戏
tags:
  - 网络游戏
  - 魔兽世界
abbrlink: be10087
description: 留个备份。
date: 2024-08-29 00:00:00
---

## Binding | 按键设置

[戒律按键](https://myslot.net/mrgArnLc)

[敏锐按键](https://myslot.net/XOnzR4Kg)

[战斗按键](https://myslot.net/o8Iblnxl)

## Addons | 插件列表

### Addons for Classic

- AtlasLoot:https://www.curseforge.com/wow/addons/atlaslootclassic
- Auctionator: https://www.curseforge.com/wow/addons/auctionator
- Attune:https://www.curseforge.com/wow/addons/attune
- Bagnon:https://www.curseforge.com/wow/addons/bagnon
- BlizzMove:https://www.curseforge.com/wow/addons/blizzmove
- BigDebuffs:https://www.curseforge.com/wow/addons/bigdebuffs
- CharacterStatsClassic:https://www.curseforge.com/wow/addons/characterstatsclassic
- Classic Aura Durations:https://www.curseforge.com/wow/addons/classicauradurations
- Classic Castbars:https://www.curseforge.com/wow/addons/classiccastbars
- Details:https://www.curseforge.com/wow/addons/details
- HealBarClassic:https://www.curseforge.com/wow/addons/healbarsclassic
- ItemRack:https://www.curseforge.com/wow/addons/itemrack-classic
- Leatrix Plus:https://www.curseforge.com/wow/addons/leatrix-plus-classic
- Leatrix Maps:https://www.curseforge.com/wow/addons/leatrix-maps-classic
- LoseControl:https://www.curseforge.com/wow/addons/losecontrol
- MerInspect:https://www.curseforge.com/wow/addons/merinspect-classic-era
- Nova World Buffs:https://www.curseforge.com/wow/addons/nova-world-buffs
- OmniBar:https://www.curseforge.com/wow/addons/omnibar
- OmniCC:https://www.curseforge.com/wow/addons/omni-cc
- Questie:https://www.curseforge.com/wow/addons/questie
- Stat Weights Classic:https://www.curseforge.com/wow/addons/stat-weights-classic
- Target Health:https://www.curseforge.com/wow/addons/target-health
- Trinket Menu:https://www.curseforge.com/wow/addons/trinket-menu
- WeakAuras:https://www.curseforge.com/wow/addons/weakauras-2

### Addons for Classic_sod

- AtlasLoot_sod:https://www.curseforge.com/wow/addons/atlaslootclassic_sod
- Rune Reminder:https://www.curseforge.com/wow/addons/runereminder-season-of-discover

### Addons for WotLK

- AtlasLootClassic:https://www.curseforge.com/wow/addons/atlaslootclassic
- Auctionator: https://www.curseforge.com/wow/addons/auctionator
- BattleGroundEnemies:https://www.curseforge.com/wow/addons/battlegroundenemies
- Bagnon:https://www.curseforge.com/wow/addons/bagnon
- BiaoGe:https://www.curseforge.com/wow/addons/biaoge
- BigDebuffs:https://www.curseforge.com/wow/addons/bigdebuffs
- Bis-Tooltip:https://www.curseforge.com/wow/addons/bis-tooltip
- BlizzMove:https://www.curseforge.com/wow/addons/blizzmove
- BugGrabber:https://www.curseforge.com/wow/addons/bug-grabber
- BugSack:https://www.curseforge.com/wow/addons/bugsack
- Details:https://www.curseforge.com/wow/addons/details
- Leatrix Maps:https://www.curseforge.com/wow/addons/leatrix-maps-classic
- Leatrix Plus:https://www.curseforge.com/wow/addons/leatrix-plus-classic
- LoseControl:https://www.curseforge.com/wow/addons/losecontrol
- Merinspect:https://www.curseforge.com/wow/addons/merinspect-classic-era
- Myslot:https://www.curseforge.com/wow/addons/myslot
- OmniCC:https://www.curseforge.com/wow/addons/omni-cc
- Simple Item Levels:https://www.curseforge.com/wow/addons/simple-item-level
- SUI:https://www.curseforge.com/wow/addons/sui
- TacoTip:https://www.curseforge.com/wow/addons/tacotip-gearscore-talents
- WeakAuras:https://www.curseforge.com/wow/addons/weakauras-2
  - PvP Nameplate Auras:https://wago.io/Ks2t7qU7a
  - In-Nameplate Combo Points:https://wago.io/ysj6zo6ox
  - Ulduar:https://wago.io/uKMqfYh2d
  - TOC:https://wago.io/DSRM0qD0Q

## Macro | 宏命令

### Macro for 通用

[WLK 数据库](https://www.wowhead.com/wotlk/cn/database)

[附魔外观](https://bbs.nga.cn/read.php?pid=464763295&opt=128)

[坐骑代码](https://bbs.nga.cn/read.php?tid=15414317)

```lua

--UI设置
/fstack --命令 /fstack 鼠标移动到想要隐藏的元素上 CTRL 然后加上Hide()

-- 坐骑
#showtooltip
/cast [mod:shift]梦魇翡翠幼龙;迅捷幽灵虎

-- 装备部位
#showtooltip
/use 8 --鞋子
/use 10 --手套
/use 13 --饰品1
/use 14 --饰品2
/use 16 --主手
/use 17 --副手
```

---

### Macro for 牧师

```lua
#showtooltip
/cast [@mouseover,help]强效治疗术
/cast [@mouseover,harm]心灵震爆
/cast [@target,help]强效治疗术
/cast [@target,harm]心灵震爆

#showtooltip
/cast [@mouseover,help]愈合祷言
/cast [@mouseover,harm]神圣之火
/cast [@target,help]愈合祷言
/cast [@target,harm]神圣之火

#showtooltip
/cast [@mouseover,help]苦修
/cast [@mouseover,harm]苦修
/cast [@target,help]苦修
/cast [@target,harm]苦修

#showtooltip
/cast [@mouseover,help]快速治疗
/cast [@mouseover,harm]暗言术：痛
/cast [@target,help]快速治疗
/cast [@target,harm]暗言术：痛

#showtooltip
/cast [@mouseover,help]联结治疗
/cast [@mouseover,harm]惩击
/cast [@target,help]联结治疗
/cast [@target,harm]惩击

#showtooltip
/cast [@mouseover,help]治疗祷言
/cast [@mouseover,harm]噬灵疫病
/cast [@target,help]治疗祷言
/cast [@target,harm]噬灵疫病

#showtooltip
/cast [@mouseover,help]真言术：盾
/cast [@target,help]真言术：盾
/cast 真言术：盾

#showtooltip
/cast [@mouseover,help]恢复
/cast [@mouseover,harm]暗言术：灭
/cast [@target,help]恢复
/cast [@target,harm]暗言术：灭

#showtooltip
/stopcasting
/cast 绝望祷言
/use 邪能治疗石
/use 符文治疗注射器
/use 符文治疗药水
/use 战斗大师的勇敢
/use 联盟军旗

#showtooltip
/stopcasting
/cast [@cursor] 群体驱散

#showtooltip
/cast [mod:shift]驱除疾病;驱散魔法

#showtooltip 精神灼烧
/cast [@targettarget,harm,nodead][] 精神灼烧

```

### Macro for 盗贼

```lua
#showtooltip
/cleartarget
/targetenemy
/cancelaura [nocombat]暗影之舞
/cast [mod:shift]侦测;[nostance,nocombat]!潜行;闷棍
/cast [nomod,stealth,@target,exists]搜索

#showtooltip 偷袭
/use 10
/cast 预谋
/cast 偷袭

#showtooltip 锁喉
/cast 预谋
/cast 锁喉

#showtooltip 伏击
/cast 预谋
/cast 暗影之舞
/use 10
/cast 伏击

#showtooltip 脚踢
/stopcasting
/cast [target=focus,harm,exists][harm] [target=targettarget, harm] 脚踢

#showtooltip 致盲
/stopcasting
/cast [target=focus,harm,exists][harm] [target=targettarget, harm] 致盲

#showtooltips 嫁祸诀窍
/cast [target=mouseover,help,nodead,exists]嫁祸诀窍
/cast [target=focus,help][target=targettarget,help,nodead]嫁祸诀窍

#showtooltip
/stopcasting
/cast [@cursor] 扰乱

#showtooltip
/stopcasting
/use 邪能治疗石
/use 符文治疗注射器
/use 符文治疗药水
/use 战斗大师的勇敢
/use 联盟军旗

#showtooltip
/use [button:1]致命药膏 IX
/use [button:1]16
/use [button:2]速效药膏 IX
/use [button:2]17
/click StaticPopup1Button1

#showtooltip
/use [button:1]致命药膏 IX
/use [button:1]16
/use [button:2]减速药膏
/use [button:2]17
/click StaticPopup1Button1
```
