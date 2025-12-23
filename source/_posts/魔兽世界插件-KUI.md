---
title: 魔兽世界插件-KUI
categories: 游戏
tags:
  - 网络游戏
  - 魔兽世界
abbrlink: 7c89e4ff
description: 通过ChatGPT进行编写基于暴雪默认风格的简约插件。
date: 2025-01-01 00:00:00
---

## 插件背景

一直就喜欢暴雪默认风格，配合几个简单第三方功能插件，就可以实现非常满意的魔兽世界 UI 布局。

常年混迹于 NGA 插件板块，对于"暴雪风格"情有独钟，经常使用论坛网友的插件包，基于自己的特殊需求，面向"ChatGPT"开始写插件！

在尝试多个暴雪风格插件后，觉得使用"SUI"作为基础插件，因为其材质和布局对于我来说非常友好，基本上满足 80%+的布局需求。

[SUI](https://www.curseforge.com/wow/addons/sui)

[SUI 汉化文件](https://bbs.nga.cn/read.php?tid=43005012)

[我的插件列表](https://kakarrot.com/posts/be10087/)

## 插件功能

### 界面 UI 截图

![_20250306173144.png](https://s2.loli.net/2025/03/06/xabL2ZY8UJg9Ice.jpg)

### 配置文件

- 后续需要添加新功能可直接创建对于的`lua`文件
- `KUI.lua`为空文档，文件内可添加一些更为简单的`lua`代码

```toc
## Interface: 30403
## Author: KAKARROT
## Version: 1.0
## Title: |cffedf30fK|r|cff009cffUI|r Classic
## Notes: 自定义暴雪框体

KUI.lua
UnitFrames.lua
RaidFrames.lua
ActionBar.lua
SetCVars.lua
```

### 头像框体

- 设置框体位置定位(根据职业不同位置不同)
- 设置框体文字大小
- 设置框体整体缩放

```lua
-- 定义职业的头像定位和缩放配置
local playerFrameConfig = {
    ["PRIEST"] = {
        player = { x = -495, y = 320 }, -- 牧师玩家框体位置和缩放
        target = { x = -265, y = 320 }  -- 牧师目标框体位置和缩放
    },
    ["ROGUE"] = {
        player = { x = -350, y = 100 }, -- 盗贼玩家框体位置和缩放
        target = { x = -200, y = 50 }   -- 盗贼目标框体位置和缩放
    }
}

-- 设置字体大小
local function SetFontSize(frame, size)
    local font, _, flags = frame:GetFont()
    frame:SetFont(font, size, flags)
end

-- 初始化框体位置和缩放
local function InitializeFrames()
    local _, playerClass = UnitClass("player") -- 获取玩家职业
    local config = playerFrameConfig[playerClass]

    if config then
        -- 玩家框体设置
        PlayerFrame:ClearAllPoints()
        PlayerFrame:SetPoint("CENTER", UIParent, "CENTER", config.player.x, config.player.y)

        -- 目标框体设置
        TargetFrame:ClearAllPoints()
        TargetFrame:SetPoint("CENTER", UIParent, "CENTER", config.target.x, config.target.y)
    end
end

-- 动态调整状态文字（数值、百分比、同时显示）
local function UpdateTextDisplay()
    local showStatusText = GetCVar("statusTextDisplay")
    local fontSize = 10   -- 玩家名字字体大小
    local barFontSize = 8 -- 血量和能量字体大小

    -- 玩家框体字体设置
    SetFontSize(PlayerName, fontSize)
    SetFontSize(PlayerFrameHealthBarText, barFontSize)
    SetFontSize(PlayerFrameHealthBarTextLeft, barFontSize)
    SetFontSize(PlayerFrameHealthBarTextRight, barFontSize)
    SetFontSize(PlayerFrameManaBarText, barFontSize)
    SetFontSize(PlayerFrameManaBarTextLeft, barFontSize)
    SetFontSize(PlayerFrameManaBarTextRight, barFontSize)

    -- 目标框体字体设置
    SetFontSize(TargetFrameTextureFrameName, fontSize)
    SetFontSize(TargetFrameTextureFrame.HealthBarText, barFontSize)
    SetFontSize(TargetFrameTextureFrame.HealthBarTextLeft, barFontSize)
    SetFontSize(TargetFrameTextureFrame.HealthBarTextRight, barFontSize)
    SetFontSize(TargetFrameTextureFrame.ManaBarText, barFontSize)
    SetFontSize(TargetFrameTextureFrame.ManaBarTextLeft, barFontSize)
    SetFontSize(TargetFrameTextureFrame.ManaBarTextRight, barFontSize)

    -- 根据游戏内设置显示状态文字
    if showStatusText == "0" then
        PlayerFrameHealthBarText:Hide()
        PlayerFrameManaBarText:Hide()
        TargetFrameTextureFrame.HealthBarText:Hide()
        TargetFrameTextureFrame.ManaBarText:Hide()
    else
        PlayerFrameHealthBarText:Show()
        PlayerFrameManaBarText:Show()
        TargetFrameTextureFrame.HealthBarText:Show()
        TargetFrameTextureFrame.ManaBarText:Show()
    end
end

-- 注册事件监听
local function OnEvent(self, event, ...)
    if event == "PLAYER_ENTERING_WORLD" or event == "PLAYER_LOGIN" then
        InitializeFrames()
        UpdateTextDisplay()
    elseif event == "CVAR_UPDATE" then
        UpdateTextDisplay()
    end
end

-- 创建框架和事件监听器
local frame = CreateFrame("Frame")
frame:RegisterEvent("PLAYER_ENTERING_WORLD")
frame:RegisterEvent("PLAYER_LOGIN")
frame:RegisterEvent("CVAR_UPDATE")
frame:SetScript("OnEvent", OnEvent)
```

### 动作条

- 设置动作条按键字体大小
- 设置动作条宏字体大小
- 设置动作条按键简化显示

```lua
-- 初始化函数：设置动作条快捷键和宏命令字体大小
local function SetActionBarFont()
    -- 动作条列表
    local actionBars = {
        "ActionButton",              -- 主动作条
        "MultiBarBottomLeftButton",  -- 左下动作条
        "MultiBarBottomRightButton", -- 右下动作条
        "MultiBarRightButton",       -- 右侧动作条
        "MultiBarLeftButton",        -- 左侧动作条
    }

    -- 设置字体大小
    local hotkeyFontSize = 8 -- 快捷键字体大小
    local macroFontSize = 8  -- 宏命令字体大小

    -- 遍历每个动作条和按钮
    for _, barName in ipairs(actionBars) do
        for i = 1, 12 do
            -- 快捷键字体设置
            local hotkeyFrame = _G[barName .. i .. "HotKey"]
            if hotkeyFrame then
                hotkeyFrame:SetFont(STANDARD_TEXT_FONT, hotkeyFontSize, "OUTLINE")
            end

            -- 宏命令字体设置
            local macroFrame = _G[barName .. i .. "Name"]
            if macroFrame then
                macroFrame:SetFont(STANDARD_TEXT_FONT, macroFontSize, "OUTLINE")
            end
        end
    end
end

-- 替换快捷键文字为简化格式
local function SimplifyHotkeyText(hotkey)
    if hotkey and hotkey:GetText() then
        local replace = string.gsub
        local text = hotkey:GetText()

        -- 替换规则：简化复杂的按键名称
        text = replace(text, "(s%-)", "S")
        text = replace(text, "(a%-)", "A")
        text = replace(text, "(c%-)", "C")
        text = replace(text, "(Mouse Button )", "M")
        text = replace(text, "(鼠标中键)", "M3")
        text = replace(text, "(鼠标按键4)", "M4")
        text = replace(text, "(鼠标按键5)", "M5")
        text = replace(text, "(鼠标滚轮向上滚动)", "MU")
        text = replace(text, "(鼠标滚轮向下滚动)", "MD")
        text = replace(text, "(数字键盘)", "N")
        text = replace(text, "Capslock", "CK")
        text = replace(text, "(Page Up)", "PU")
        text = replace(text, "(Page Down)", "PD")
        text = replace(text, "(空格键)", "SpB")
        text = replace(text, "(Insert)", "Ins")
        text = replace(text, "(Home)", "Hm")
        text = replace(text, "(Delete)", "Del")

        -- 更新快捷键文本
        hotkey:SetText(text)
    end
end

-- 更新动作条快捷键文字
local function UpdateHotkeys(self)
    local hotkey = _G[self:GetName() .. "HotKey"]
    SimplifyHotkeyText(hotkey)
end

-- 隐藏动作条两边装饰图案的函数
local function HideActionBarArt()
    -- 直接通过全局变量隐藏两侧装饰
    if MainMenuBarLeftEndCap then
        MainMenuBarLeftEndCap:Hide()
        MainMenuBarLeftEndCap.Show = function() end -- 防止其他插件再次显示
    end
    if MainMenuBarRightEndCap then
        MainMenuBarRightEndCap:Hide()
        MainMenuBarRightEndCap.Show = function() end
    end

    -- 解除界面更新锁定
    MainMenuBar:SetScript("OnUpdate", nil)
end

-- 注册事件：加载设置并隐藏装饰
local Event = CreateFrame("Frame", nil, UIParent)
Event:RegisterEvent("PLAYER_LOGIN")
Event:SetScript("OnEvent", function(self, event, ...)
    if event == "PLAYER_LOGIN" then
        -- 设置动作条字体大小
        SetActionBarFont()

        -- 钩子函数：简化快捷键文字
        hooksecurefunc("ActionButton_UpdateHotkeys", UpdateHotkeys)

        -- 隐藏动作条两边的装饰图案
        HideActionBarArt()
    end
end)

```

### 团队框架

- 设置团队框架整体缩放
- 设置团队框架名字字体大小
- 设置团队框架状态文字大小

```lua
-- 插件初始化
local function InitializeRaidFrame()

    -- 隐藏团队框架标题
    hooksecurefunc("CompactRaidGroup_GenerateForGroup", function(groupIndex)
        local frame = _G["CompactRaidGroup"..groupIndex]
        if frame then
            frame.title:SetText("")
        end
    end)

    -- 设置团队框架的缩放比例
    CompactRaidFrameContainer:SetScale(1) -- 修改缩放比例为 1.2，可根据需求调整

    -- 遍历每个团队框架成员
    for i = 1, 40 do
        local nameFrame = _G["CompactRaidFrame" .. i .. "Name"]
        local statusFrame = _G["CompactRaidFrame" .. i .. "StatusText"]

        -- 设置名字字体大小为 10
        if nameFrame then
            nameFrame:SetFont(STANDARD_TEXT_FONT, 8, "OUTLINE")
        end

        -- 设置状态字体大小为 8
        if statusFrame then
            statusFrame:SetFont(STANDARD_TEXT_FONT, 8, "OUTLINE")
        end
    end
end

-- 注册事件：确保在玩家进入世界后执行
local frame = CreateFrame("Frame")
frame:RegisterEvent("PLAYER_ENTERING_WORLD")
frame:SetScript("OnEvent", function(self, event, ...)
    if event == "PLAYER_ENTERING_WORLD" then
        InitializeRaidFrame()
        self:UnregisterEvent("PLAYER_ENTERING_WORLD") -- 取消注册，避免多次调用
    end
end)
```

### CVars 参数

> CVars 是基于魔兽世界系统设置的配置参数

- 姓名板相关设置
- 战斗和目标设置
- 界面优化设置
- 聊天与社交设置
- 镜头和视角设置
- 图形和性能优化设置
- 其他设置

```lua
local addonName, addon = ...

-- 插件初始化函数
local function InitializeAddon()
    -- 姓名板相关设置
    SetCVar("ShowClassColorInFriendlyNameplate", 1) -- 显示友方姓名板职业颜色
    SetCVar("nameplateShowOnlyNames", 0)            -- 姓名板显示完整信息（不仅仅是名字）
    SetCVar("nameplateMaxDistance", 41)             -- 调整姓名板的最大可视距离（默认是20，可以调到40）
    SetCVar("nameplateShowFriends", 0)              -- 禁用友方单位姓名板（仅显示敌对单位）
    SetCVar("nameplateShowEnemies", 1)              -- 启用敌对姓名板

    -- 战斗和目标设置
    SetCVar("autoAttack", 1)                -- 自动攻击开始时自动切换目标
    SetCVar("ShowClassColorInNameplate", 1) -- 显示敌方玩家职业颜色
    SetCVar("threatShowNumeric", 1)         -- 显示目标的仇恨状态
    SetCVar("assistAttack", 0)              -- 禁用目标框架上的 "点击自动攻击"

    -- 界面优化
    SetCVar("enableFloatingCombatText", 1)        -- 显示界面上数值
    SetCVar("statusTextDisplay", "BOTH")       -- 显示状态文本百分比（可选值：NONE / NUMERIC / PERCENT / BOTH）
    SetCVar("ffx", 0)                             -- 禁用画面模糊（例如传送门特效）
    SetCVar("uiscale", 1)                         -- 增加界面缩放范围（可在系统设置中进一步调整）
    SetCVar("floatingCombatTextCombatDamage", 1)  -- 禁用浮动文本动画（如法术治疗、伤害数值）
    SetCVar("floatingCombatTextCombatHealing", 1) -- 禁用浮动文本动画（如法术治疗、伤害数值）

    -- 聊天与社交
    SetCVar("profanityFilter", 0)     -- 禁用聊天过滤器
    SetCVar("showTimestamps", "none") -- 始终显示聊天时间戳
    SetCVar("CombatLogRetention", 30) -- 设置战斗日志保存时间

    -- 镜头和视角
    SetCVar("cameraSmoothStyle", 0)             -- 禁用镜头缩放动画
    SetCVar("cameraDistanceMaxZoomFactor", 2.6) -- 设置镜头最大视距
    SetCVar("cameraBobbing", 0)                 -- 禁用镜头晃动效果（如骑马时）

    -- 图形和性能优化
    SetCVar("weatherDensity", 0)    -- 禁用天气密度
    SetCVar("graphicsSunshafts", 0) -- 禁用阳光射线

    -- 其他设置
    SetCVar("chatClassColorOverride", 0) -- 禁用聊天职业颜色覆盖
    SetCVar("audioLocale", "zhCN")       -- 设置音频语言为简体中文
    SetCVar("textLocale", "zhCN")        -- 设置文本语言为简体中文
    SetCVar("mouseSpeed", 1)             -- 设置鼠标速度
    SetCVar("ffxGlow", 0)                -- 禁用发光效果
    SetCVar("ffxDeath", 0)               -- 禁用死亡效果
    SetCVar("ffxNether", 0)              -- 禁用虚空效果
    SetCVar("overrideArchive", 0)        -- 反骷髅和谐
end

-- 注册事件，在玩家登录时初始化插件
local eventFrame = CreateFrame("Frame")
eventFrame:RegisterEvent("PLAYER_LOGIN") -- 注册 PLAYER_LOGIN 事件
eventFrame:SetScript("OnEvent", function(self, event, ...)
    if event == "PLAYER_LOGIN" then
        InitializeAddon() -- 玩家登录后执行初始化
    end
end)
```
