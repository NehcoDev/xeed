TriggerEvent('es:addGroupCommand', 'tp', 'mod', function(source, args, user)
	local x = tonumber(args[1])
	local y = tonumber(args[2])
	local z = tonumber(args[3])
	
	if x and y and z then
		TriggerClientEvent('esx:teleport', source, {
			x = x,
			y = y,
			z = z
		})
	else
		TriggerClientEvent('chatMessage', source, "DreamLife", {255, 0, 0}, "Coordonnées invalide")
	end
end, function(source, args, user)
	TriggerClientEvent('chat:addMessage', source, { args = { '^1DreamLife', 'Vous n\'avez pas les permissions.' } })
end, {help = "Téléporter aux cordonées", params = {{name = "X", help = ""}, {name = "Y", help = ""}, {name = "Z", help = "Y"}}})

TriggerEvent('es:addGroupCommand', 'addjob', 'superadmin', function(source, args, user)
	if tonumber(args[1]) and args[2] and tonumber(args[3]) then
		local xPlayer = ESX.GetPlayerFromId(args[1])

		if xPlayer then
			if ESX.DoesJobExist(args[2], args[3]) then
				xPlayer.setJob(args[2], args[3])
			else
				TriggerClientEvent('chat:addMessage', source, { args = { '^2DreamLife', 'Le JOB n\'existe pas.' } })
			end

		else
			TriggerClientEvent('chat:addMessage', source, { args = { '^2DreamLife', 'Joueur déconnecté' } })
		end
	else
		TriggerClientEvent('chat:addMessage', source, { args = { '^2DreamLife', 'ID Inconnu' } })
	end
end, function(source, args, user)
	TriggerClientEvent('chat:addMessage', source, { args = { '^2DreamLife', 'Vous n\'avez pas les permissions.' } })
end, {help = ('Ajouter un JOB'), params = {{name = "ID", help = ('ID')}, {name = "JOB", help = ('Nom du JOB')}, {name = "Grade", help = ('Grade')}}})

TriggerEvent('es:addGroupCommand', 'addcrew', 'superadmin', function(source, args, user)
	if tonumber(args[1]) and args[2] and tonumber(args[3]) then
		local xPlayer = ESX.GetPlayerFromId(args[1])

		if xPlayer then
			xPlayer.setJob2(args[2], tonumber(args[3]))
		else
			TriggerClientEvent('chat:addMessage', source, { args = { '^2DreamLife', 'Joueur déconnecté' } })
		end
	else
		TriggerClientEvent('chat:addMessage', source, { args = { '^2DreamLife', 'ID Inconnu' } })
	end
end, function(source, args, user)
	TriggerClientEvent('chat:addMessage', source, { args = { '^2DreamLife', 'Vous n\'avez pas les permissions.' } })
end, {help = ('Ajouter un JOB'), params = {{name = "ID", help = ('ID')}, {name = "CREW", help = ('Nom du CREW')}, {name = "Grade", help = ('Grade')}}})

TriggerEvent('es:addGroupCommand', 'car', 'superadmin', function(source, args, user)
	TriggerClientEvent('esx:spawnVehicle', source, args[1])
end, function(source, args, user)
	TriggerClientEvent('chat:addMessage', source, { args = { '^2DreamLife', 'Vous n\'avez pas les permissions.' } })
end, {help = ('Spawn un véhicule'), params = {{name = "car", help = ('Nom du véhicule')}}})

TriggerEvent('es:addGroupCommand', 'dl', 'admin', function(source, args, user)
	TriggerClientEvent('esx:deleteVehicle', source)
end, function(source, args, user)
	TriggerClientEvent('chat:addMessage', source, { args = { '^2DreamLife', 'Vous n\'avez pas les permissions.' } })
end, {help = ('Supprimer le véhicule')})

TriggerEvent('es:addGroupCommand', 'spawnobject', 'superadmin', function(source, args, user)
	TriggerClientEvent('esx:spawnObject', source, args[1])
end, function(source, args, user)
	TriggerClientEvent('chat:addMessage', source, { args = { '^1SYSTEM', 'Insufficient Permissions.' } })
end, {help = _U('spawn_object'), params = {{name = "name"}}})

TriggerEvent('es:addGroupCommand', 'setmoney', 'superadmin', function(source, args, user)
	local _source = source
	local target = tonumber(args[1])
	local money_type = args[2]
	local money_amount = tonumber(args[3])
	
	local xPlayer = ESX.GetPlayerFromId(target)

	if target and money_type and money_amount and xPlayer ~= nil then
		if money_type == 'cash' then
			xPlayer.setMoney(money_amount)
		elseif money_type == 'bank' then
			xPlayer.setAccountMoney('bank', money_amount)
		elseif money_type == 'black' then
			xPlayer.setAccountMoney('black_money', money_amount)
		else
			TriggerClientEvent('chatMessage', _source, "SYSTEM", {255, 0, 0}, "^2" .. money_type .. " ^0 is not a valid money type!")
			return
		end
	else
		TriggerClientEvent('chatMessage', _source, "SYSTEM", {255, 0, 0}, "Invalid arguments.")
		return
	end
	
	print('es_extended: ' .. GetPlayerName(source) .. ' just set $' .. money_amount .. ' (' .. money_type .. ') to ' .. xPlayer.name)
	
	if xPlayer.source ~= _source then
		TriggerClientEvent('esx:showNotification', xPlayer.source, _U('money_set', money_amount, money_type))
	end
end, function(source, args, user)
	TriggerClientEvent('chat:addMessage', source, { args = { '^1SYSTEM', 'Insufficient Permissions.' } })
end, {help = _U('setmoney'), params = {{name = "id", help = _U('id_param')}, {name = "money type", help = _U('money_type')}, {name = "amount", help = _U('money_amount')}}})

TriggerEvent('es:addGroupCommand', 'giveaccountmoney', 'superadmin', function(source, args, user)
	local _source = source
	local xPlayer = ESX.GetPlayerFromId(args[1])
	local account = args[2]
	local amount  = tonumber(args[3])

	if amount ~= nil then
		if xPlayer.getAccount(account) ~= nil then
			xPlayer.addAccountMoney(account, amount)
		else
			TriggerClientEvent('esx:showNotification', _source, _U('invalid_account'))
		end
	else
		TriggerClientEvent('esx:showNotification', _source, _U('amount_invalid'))
	end
end, function(source, args, user)
	TriggerClientEvent('chat:addMessage', source, { args = { '^1SYSTEM', 'Insufficient Permissions.' } })
end, {help = _U('giveaccountmoney'), params = {{name = "id", help = _U('id_param')}, {name = "account", help = _U('account')}, {name = "amount", help = _U('money_amount')}}})

TriggerEvent('es:addGroupCommand', 'giveweapon', 'superadmin', function(source, args, user)
	local xPlayer    = ESX.GetPlayerFromId(args[1])
	local weaponName = string.upper(args[2])

	xPlayer.addWeapon(weaponName, tonumber(args[3]))
end, function(source, args, user)
	TriggerClientEvent('chat:addMessage', source, { args = { '^1SYSTEM', 'Insufficient Permissions.' } })
end, {help = _U('giveweapon'), params = {{name = "id", help = _U('id_param')}, {name = "weapon", help = _U('weapon')}, {name = "ammo", help = _U('amountammo')}}})

TriggerEvent('es:addGroupCommand', 'giveitem', 'superadmin', function(source, args, user)
	local _source = source
	local xPlayer = ESX.GetPlayerFromId(args[1])
	local item    = args[2]
	local count   = (args[3] == nil and 1 or tonumber(args[3]))

	if count ~= nil then
		if xPlayer.getInventoryItem(item) ~= nil then
			xPlayer.addInventoryItem(item, count)
		else
			TriggerClientEvent('esx:showNotification', _source, _U('invalid_item'))
		end
	else
		TriggerClientEvent('esx:showNotification', _source, _U('invalid_amount'))
	end
end, function(source, args, user)
	TriggerClientEvent('chat:addMessage', source, { args = { '^2DreamLife', 'Vous n\'avez pas les permissions.' } })
end, {help = _U('giveitem'), params = {{name = "id", help = _U('id_param')}, {name = "item", help = _U('item')}, {name = "amount", help = _U('amount')}}})

TriggerEvent('es:addGroupCommand', 'clear', 'user', function(source, args, user)
	TriggerClientEvent('chat:clear', source)
end, function(source, args, user)
	TriggerClientEvent('chat:addMessage', source, { args = { '^2DreamLife', 'Vous n\'avez pas les permissions.' } })
end, {help = ('Videz le chat')})
