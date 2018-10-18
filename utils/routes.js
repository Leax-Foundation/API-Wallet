'use strict';

//autor: Daniel Marques

const mailer = require('./mailer');
const fs = require("fs");
const Lightwallet = require('eth-lightwallet');
const isNullOrUndefined = require('util');
const Web3 = require('web3');
const HookedWeb3Provider = require('hooked-web3-provider');
const async = require('async');
const Request = require('request');

let web3 = new Web3();
let contractAddress = 0x3bCFE4786CE5669FE06282eBf11AfE3d0F606CdA;
let contractAddr = '0x3bCFE4786CE5669FE06282eBf11AfE3d0F606CdA';
let contractAbi = JSON.parse('[{"constant":true,"inputs":[],"name":"awardsReservations","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalTokenToSale","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"manuallyAssignTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_rate","type":"uint256"}],"name":"setRate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tokensSold","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pauseEmergence","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"bounty","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"walletETH","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"icoEndTimestampStage","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensTeamBlockedTimestamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenSale","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"setPauseEmergence","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"setUnPauseEmergence","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"icoStartTimestampStage","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"walletTeam","type":"address"}],"name":"sendTokenTeamAdvisor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"contractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"burner","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]');
let contractInstance = web3.eth.contract(contractAbi).at(contractAddress);
let txutils = Lightwallet.txutils;
let signing = Lightwallet.signing;
let encryption = Lightwallet.encryption;
let txOptions = Lightwallet.txOptions; 

let Apikeys = ["V4PQ2PWQPG3HX8I9J7N159HZX9KY6UH1MR","41ZR3MY5C7F4UC44MXBSNRUVTBAQAJG7I9","Q2SR7V7HNF7NUSH629HBJ1F9JQMFEWZK3F"];

class Routes{

	constructor(app){
		this.app = app;
	}

	/* creating app Routes starts */
	appRoutes(){
		
		this.app.get('/api/seed/:point',(request, response) => {
			if(isNullOrUndefined.isNullOrUndefined(request.params.point))
			{
				let error = { 
					isError: true,
					msg: "Error read parameter <point>"
				};
				response.status(400).json(error);
			}
			
			let seedPoint = request.params.point.toString();	
			let data = { 
				isError: false,
				seed: Lightwallet.keystore.generateRandomSeed(seedPoint) 
			};
			response.status(200).json(data);
		})	
	
		//create new wallet ERC20
		this.app.post('/api/wallet', function(request, response){
			if(isNullOrUndefined.isNullOrUndefined(request.body.seed))
			{
				let error = { 
					isError: true,
					msg: "Error read parameter <seed>"
				};
				response.status(400).json(error);
			}	
			if(isNullOrUndefined.isNullOrUndefined(request.body.password))
			{
				let error = { 
					isError: true,
					msg: "Error read parameter <password>"
				};
				response.status(400).json(error);
			}	
			let paramPassword = request.body.password.toString();
			let paramSeed = request.body.seed.toString();
			let numAddr = 1;

			Lightwallet.keystore.createVault({
				password: paramPassword,
				seedPhrase: paramSeed,
				//random salt 
				hdPathString: "m/44'/60'/0'/0"
			  }, function (err, ks) { 
				ks.keyFromPassword(paramPassword, function(err, pwDerivedKey) {
					if(ks.isDerivedKeyCorrect(pwDerivedKey))
					{
						ks.generateNewAddress(pwDerivedKey, numAddr);  
						let data = {							
							wallet: ks
						};
						response.status(200).json(data);
					}else{	
						let error = {
							isError: true,
							msg: 'Password incorret'						
						};				
						response.status(400).json(error);
					}	
				})
			})	
		});			
		
		//Load wallet for seed
		this.app.post('/api/wallet/seed', function(request, response){
			if(isNullOrUndefined.isNullOrUndefined(request.body.seed))
			{
				let error = { 
					isError: true,
					msg: "Error read parameter <seed>"
				};
				response.status(400).json(error);
			}	
			if(isNullOrUndefined.isNullOrUndefined(request.body.password))
			{
				let error = { 
					isError: true,
					msg: "Error read parameter <password>"
				};
				response.status(400).json(error);
			}		
						
			let numAddr = 1;			
			let pass = request.body.password.toString();
			let randomSeed = request.body.seed.toString();	
			
				
			let hdPathType = "m/0'/0'/0'"
			Lightwallet.keystore.createVault({		
				password: pass,	
				seedPhrase: randomSeed,	
				hdPathString: hdPathType	
			}, function (err, ks) {					   
				ks.keyFromPassword(pass, function(err, pwDerivedKey) {
					if(ks.isDerivedKeyCorrect(pwDerivedKey))
					{
						ks.generateNewAddress(pwDerivedKey, numAddr);						
						if(!err)
						{
							let web3Provider = new HookedWeb3Provider({
								host: "https://mainnet.infura.io/7xNw0DpR7VrQxYmSs303 ",
								transaction_signer: ks
							});		  
							web3.setProvider(web3Provider); 									
							let addr = ks.getAddresses()[0];								
							let contractData = contractInstance.balanceOf.getData(addr);	
															
							web3.eth.call({
								to: contractAddr, // Contract address, used call the token balance of the address in question
								data: contractData // Combination of contractData and tknAddress, required to call the balance of an address 
								}, function(err, result) {
									if (result) { 
										let tokens = web3.toBigNumber(result).toString(); // Convert the result to a usable number string
										let balanceToken = web3.fromWei(tokens, 'ether');
										if(balanceToken > 0){
											let data = {							
												wallet: ks
											} 											
											response.status(200).json(data);
										}else{
											hdPathType = "m/44'/60'/0'/0";
											Lightwallet.keystore.createVault({		
												password: pass,	
												seedPhrase: randomSeed,	
												hdPathString: hdPathType	
											}, function (err, ks) {					   
												ks.keyFromPassword(pass, function(err, pwDerivedKey) {
													if(ks.isDerivedKeyCorrect(pwDerivedKey))
													{
														ks.generateNewAddress(pwDerivedKey, numAddr);						
														if(!err)
														{
															let data = {							
																wallet: ks
															} 
															response.status(200).json(data);								
														}
													}
													else{	
														let error = {
															isError: true,
															msg: 'Password incorret'						
														};		
														response.status(400).json(error);
													}					  
												});
											});	
										}										
									}
									else {
										response.status(400).json(err); // Dump errors here
									}
								});	
						}
					}
					else{	
						let error = {
							isError: true,
							msg: 'Password incorret'						
						};		
						response.status(400).json(error);
					}					  
				});
			});
		});	
		
		//validate wallet with password
		this.app.post('/api/wallet/validate', function(request, response){
			if(isNullOrUndefined.isNullOrUndefined(request.body.wallet))
			{
				let error = {
					isError: true, 
					msg: "Error read Wallet Json"
					
				};
				response.status(400).json(error);
				
			}	
			if(isNullOrUndefined.isNullOrUndefined(request.body.password))
			{
				let error =  { 
					isError: true, 
					msg: "Error read parameter <password>"
				};
				response.status(400).json(error);
			}							
			let walletJson = JSON.stringify(request.body.wallet);	
			let ks = new Lightwallet.keystore.deserialize(walletJson);
			let password = request.body.password.toString();			
			ks.keyFromPassword(password, function(err, pwDerivedKey) {
				if(ks.isDerivedKeyCorrect(pwDerivedKey))
				{
					let data = {
						isError: false,												
					}
					response.status(200).json(data);
				}else{	
					let error = {
						isError: true,
						msg: 'Password incorret'						
					};				
					response.status(400).json(error);
				}	
			});			
		});

		//getWallet
		this.app.post('/api/wallet/getAddress', function(request, response){
			if(isNullOrUndefined.isNullOrUndefined(request.body.wallet))
			{
				let error = {
					isError: true, 
					msg: "Error read Wallet Json"
					
				};
				response.status(400).json(error);
				
			}	
			if(isNullOrUndefined.isNullOrUndefined(request.body.password))
			{
				let error =  { 
					isError: true, 
					msg: "Error read parameter <password>"
				};
				response.status(400).json(error);
			}							
			let walletJson = JSON.stringify(request.body.wallet);	
			let ks = new Lightwallet.keystore.deserialize(walletJson);
			let password = request.body.password.toString();			
			ks.keyFromPassword(password, function(err, pwDerivedKey) {
				if(ks.isDerivedKeyCorrect(pwDerivedKey))
				{
					let data = {
						isError: false,
						address: web3.toChecksumAddress(ks.getAddresses()[0])								
					}
					response.status(200).json(data);
				}else{	
					let error = {
						isError: true,
						msg: 'Password incorret'						
					};				
					response.status(400).json(error);
				}	
			});			
		});		

		//getPrivateKey
		this.app.post('/api/wallet/privateKey', function(request, response){
			if(isNullOrUndefined.isNullOrUndefined(request.body.wallet))
			{
				let error = {
					isError: true, 
					msg: "Error read Wallet Json"
					
				};
				response.status(400).json(error);
				
			}	
			if(isNullOrUndefined.isNullOrUndefined(request.body.password))
			{
				let error =  { 
					isError: true, 
					msg: "Error read parameter <password>"
				};
				response.status(400).json(error);
			}							
			let walletJson = JSON.stringify(request.body.wallet);	
			let ks = new Lightwallet.keystore.deserialize(walletJson);
			let password = request.body.password.toString();			
			ks.keyFromPassword(password, function(err, pwDerivedKey) {				
				if(ks.isDerivedKeyCorrect(pwDerivedKey))
				{
					let data = {
						isError: false,
						privateKey: ks.exportPrivateKey(ks.getAddresses()[0],pwDerivedKey)												
					}
					response.status(200).json(data);
				}else{	
					let error = {
						isError: true,
						msg: 'Password incorret'						
					};				
					response.status(400).json(error);
				}	
			});			
		});
		
		//validate wallet with password
		this.app.post('/api/seed/show', function(request, response){
			if(isNullOrUndefined.isNullOrUndefined(request.body.wallet))
			{
				let error = {
					isError: true, 
					msg: "Error read Wallet Json"
					
				};
				response.status(400).json(error);
				
			}				
			if(isNullOrUndefined.isNullOrUndefined(request.body.password))
			{
				let error =  { 
					isError: true, 
					msg: "Error read parameter <password>"
				};
				response.status(400).json(error);
			}							
			let walletJson = JSON.stringify(request.body.wallet);	
			let ks = new Lightwallet.keystore.deserialize(walletJson);
			let password = request.body.password.toString();				
			ks.keyFromPassword(password, function(err, pwDerivedKey) {
				if(ks.isDerivedKeyCorrect(pwDerivedKey))
				{					
					let seed = ks.getSeed(pwDerivedKey);
					let data = {
						isError: false,
						msg: seed						
					};	
					response.status(200).json(data);
				}else{	
					let error = {
						isError: true,
						msg: 'Password incorret'						
					};				
					response.status(400).json(error);
				}	
			});			
		});
		
		//show seed for wallet
		this.app.post('/api/seed', function(request, response){
			if(isNullOrUndefined.isNullOrUndefined(request.body.wallet))
			{
				let error = { 
					isError: true, 
					msg: "Error read Wallet Json"
				};
				response.status(400).json(error);
			}	
			if(isNullOrUndefined.isNullOrUndefined(request.body.password))
			{
				let error =  { 
					isError: true, 
					msg: "Error read parameter <password>"
				};
				response.status(400).json(error);
			}				
			let walletJson = JSON.stringify(request.body.wallet);	
			let ks = Lightwallet.keystore.deserialize(walletJson);
			let password = request.body.password.toString();			
			ks.keyFromPassword(password, function(err, pwDerivedKey) {				
				if(ks.isDerivedKeyCorrect(pwDerivedKey))
				{
					let data = {
						isError: false,
						seed: ks.getSeed(pwDerivedKey)						
					}
					response.status(200).json(data);
				}
				else{	
					let error = {
						isError: true,
						msg: 'Password incorret'						
					};				
					response.status(400).json(error);
				}
			});
			
		});	
		
		//get balance Eth
		this.app.post('/api/eth/balance', function(request, response){
			if(isNullOrUndefined.isNullOrUndefined(request.body.wallet))
			{
				let error = { 
					isError: true, 
					msg: "Error read Wallet Json"
				};
				response.status(400).json(error);
			}	
			if(isNullOrUndefined.isNullOrUndefined(request.body.password))
			{
				let error =  { 
					isError: true, 
					msg: "Error read parameter <password>"
				};
				response.status(400).json(error);
			}							
			let walletJson = JSON.stringify(request.body.wallet);	
			let ks = Lightwallet.keystore.deserialize(walletJson);
			let password = request.body.password.toString();
			ks.keyFromPassword(password, function(err, pwDerivedKey) {
				if(!err)
				{
					let addresses = ks.getAddresses();
					let web3Provider = new HookedWeb3Provider({
						host: "https://mainnet.infura.io/7xNw0DpR7VrQxYmSs303 ",
						transaction_signer: ks
					});		  
					web3.setProvider(web3Provider); 
					
					async.map(addresses, web3.eth.getBalance, function(err, balances) {
						async.map(addresses, web3.eth.getTransactionCount, function(err, nonces) {
							let balance = {
								isError: false,
								address: addresses[0],
								balance: balances[0] / 1.0e18
							};
							response.status(200).json(balance);					  
						})
					})					
				}
				else{	
					let error = {
						isError: true,
						msg: err						
					};
					response.status(400).json(error);
				}
			});
		});			
		
		//return data transaction
		this.app.post('/api/eth/gasCalculation', function(request, response){
			if(isNullOrUndefined.isNullOrUndefined(request.body.wallet))
			{
				let error = { 
					isError: true,
					msg: "Error read Wallet Json"
				};
				response.status(400).json(error);
			}	
			if(isNullOrUndefined.isNullOrUndefined(request.body.password))
			{
				let error =  { 
					isError: true,
					msg: "Error read parameter <password>"
				};
				response.status(400).json(error);
			}	
			if(isNullOrUndefined.isNullOrUndefined(request.body.to))
			{
				let error =  { 
					isError: true,
					msg: "Error read parameter <to>"
				};
				response.status(400).json(error);
			}	
			if(isNullOrUndefined.isNullOrUndefined(request.body.gasLimit))
			{
				let error =  { 
					isError: true,
					msg: "Error read parameter <gasLimit>"
				};
				response.status(400).json(error);
			}	
			if(isNullOrUndefined.isNullOrUndefined(request.body.gasPrice))
			{
				let error =  { 
					isError: true,					
					msg: "Error read parameter <gasPrice>"};
				response.status(400).json(error);
			}			
			if(isNullOrUndefined.isNullOrUndefined(request.body.value))
			{
				let error =  { 
					isError: true,
					msg: "Error read parameter <value>"
				};
				response.status(400).json(error);
			}	
									
									
			let walletJson = JSON.stringify(request.body.wallet);	
			let ks = Lightwallet.keystore.deserialize(walletJson);
			let password = request.body.password.toString();
			ks.keyFromPassword(password, function(err, pwDerivedKey) {	
				if(ks.isDerivedKeyCorrect(pwDerivedKey))
				{					

					let web3Provider = new HookedWeb3Provider({
						host: "https://mainnet.infura.io/7xNw0DpR7VrQxYmSs303 ",
						transaction_signer: ks
					});		  
					web3.setProvider(web3Provider); 
					
					let nonceNumber = parseInt(web3.eth.getTransactionCount(ks.getAddresses()[0], "pending"));
					let gasprices = parseInt(request.body.gasPrice) * 1000000000;
					let gasLimit = parseInt(request.body.gasLimit);				
					let sendingAddr = ks.getAddresses()[0];
					let value = parseFloat(request.body.value) * 1.0e18   //Address wallet     
					let txOptions = {
						nonce: web3.toHex(nonceNumber),
						gasLimit: web3.toHex(gasLimit),
						gasPrice: web3.toHex(gasprices),
						to: contractAddr
					}
					let arg = Array.prototype.slice.call([request.body.to,value]);   
					let rawTx = txutils.functionTx(contractAbi, 'transfer', arg, '')					  					
					var result = web3.eth.estimateGas({
						to: sendingAddr, 
						data: rawTx
					});
					let error = {
						isError: true,
						gasCalculation: result						
					};			
					response.status(400).json(error);
				}
				else{	
					let error = {
						isError: true,
						msg: 'Password incorret'						
					};			
					response.status(400).json(error);
				}
			});
		});
		
		//send Ether for other address
		this.app.post('/api/eth/send', function(request, response){
			if(isNullOrUndefined.isNullOrUndefined(request.body.wallet))
			{
				let error = { 
					isError: true,
					msg: "Error read Wallet Json"
				};
				response.status(400).json(error);
			}	
			if(isNullOrUndefined.isNullOrUndefined(request.body.password))
			{
				let error =  { 
					isError: true,
					msg: "Error read parameter <password>"
				};
				response.status(400).json(error);
			}	
			if(isNullOrUndefined.isNullOrUndefined(request.body.to))
			{
				let error =  { 
					isError: true,
					msg: "Error read parameter <to>"
				};
				response.status(400).json(error);
			}	
			if(isNullOrUndefined.isNullOrUndefined(request.body.gasLimit))
			{
				let error =  { 
					isError: true,
					msg: "Error read parameter <gasLimit>"
				};
				response.status(400).json(error);
			}	
			if(isNullOrUndefined.isNullOrUndefined(request.body.gasPrice))
			{
				let error =  { 
					isError: true,					
					msg: "Error read parameter <gasPrice>"};
				response.status(400).json(error);
			}			
			if(isNullOrUndefined.isNullOrUndefined(request.body.value))
			{
				let error =  { 
					isError: true,
					msg: "Error read parameter <value>"
				};
				response.status(400).json(error);
			}	
									
			let walletJson = JSON.stringify(request.body.wallet);				
			let ks = Lightwallet.keystore.deserialize(walletJson);			
			let password = request.body.password.toString();
			ks.keyFromPassword(password, function(err, pwDerivedKey) {	
				if(ks.isDerivedKeyCorrect(pwDerivedKey))
				{					
					if(ks.getAddresses()[0] == request.body.to)  
					{
						let error = { 
							isError: true,
							msg: "Invalid Recipient"
						};
						response.status(400).json(error);
					}  

					let web3Provider = new HookedWeb3Provider({
						host: "https://mainnet.infura.io/7xNw0DpR7VrQxYmSs303 ",
						transaction_signer: ks
					});		  
					web3.setProvider(web3Provider); 
					
					let sendingAddr = ks.getAddresses()[0];
					let nonceNumber = parseInt(web3.eth.getTransactionCount(sendingAddr.toString(), "pending"));
					
					txOptions = {};
					txOptions.to = request.body.to;
					txOptions.gasLimit = request.body.gasLimit; 
					txOptions.gasPrice = parseInt(request.body.gasPrice) * 1000000000;            
					txOptions.value =  parseFloat(request.body.value) * 1.0e18;   
					txOptions.nonce = nonceNumber;

					
					let valueTx = txutils.valueTx(txOptions);
					let signedValueTx = signing.signTx(ks, pwDerivedKey, valueTx, sendingAddr);					   
					web3.eth.sendRawTransaction('0x' + signedValueTx, function(err, hash) { 
						if(!isNullOrUndefined.isNullOrUndefined(err)){
							let error = { 
								isError: true,
								msg: err
							};
							response.status(400).json(error);
						}   
						if(!isNullOrUndefined.isNullOrUndefined(hash)){
							let data = { 
								isError: false,
								hash: hash 
							};
							response.status(200).json(data);
						}
						else
						{							
							let error = { 
								isError: true,
								msg: 'return hash is null'
							};
							response.status(400).json(error);
						}
											
					});
				}else{	
					let error = {
						isError: true,
						msg: 'Password incorret'						
					};				
					response.status(400).json(error);
				}
			});	
		});
		
		//get balance Token
		this.app.post('/api/token/balance', function(request, response){
			if(isNullOrUndefined.isNullOrUndefined(request.body.wallet))
			{
				let msg = { msg: "Error read Wallet Json"};
				response.status(400).json(msg);
			}	
			if(isNullOrUndefined.isNullOrUndefined(request.body.password))
			{
				let msg =  { msg: "Error read parameter <password>"};
				response.status(400).json(msg);
			}							
			let walletJson = JSON.stringify(request.body.wallet);	
			let ks = Lightwallet.keystore.deserialize(walletJson);			
			let password = request.body.password.toString();
			ks.keyFromPassword(password, function(err, pwDerivedKey) {
				if(!err)
				{
					let web3Provider = new HookedWeb3Provider({
						host: "https://mainnet.infura.io/7xNw0DpR7VrQxYmSs303 ",
						transaction_signer: ks
					});		  
					web3.setProvider(web3Provider); 	
					let addr = ks.getAddresses()[0];
					let contractData = contractInstance.balanceOf.getData(addr);					
					web3.eth.call({
						to: contractAddr, // Contract address, used call the token balance of the address in question
						data: contractData // Combination of contractData and tknAddress, required to call the balance of an address 
						}, function(err, result) {
					if (result) { 
						let tokens = web3.toBigNumber(result).toString(); // Convert the result to a usable number string
						let balance = {
							address: addr,
							balance: web3.fromWei(tokens, 'ether')
						};
						response.status(200).json(balance);
					}
					else {
						response.status(400).json(err); // Dump errors here
					}
					}); 
				} else {
					response.status(400).json(err);
				}      
			});			
		});
		
		//send token for other address
		this.app.post('/api/token/send', function(request, response){
			if(isNullOrUndefined.isNullOrUndefined(request.body.wallet))
			{
				let error = { 
					isError: true,
					msg: "Error read Wallet Json"
				};
				response.status(400).json(error);
			}	
			if(isNullOrUndefined.isNullOrUndefined(request.body.password))
			{
				let error =  { 
					isError: true,
					msg: "Error read parameter <password>"
				};
				response.status(400).json(error);
			}	
			if(isNullOrUndefined.isNullOrUndefined(request.body.to))
			{
				let error =  { 
					isError: true,
					msg: "Error read parameter <to>"
				};
				response.status(400).json(error);
			}	
			if(isNullOrUndefined.isNullOrUndefined(request.body.gasLimit))
			{
				let error =  { 
					isError: true,
					msg: "Error read parameter <gasLimit>"
				};
				response.status(400).json(error);
			}	
			if(isNullOrUndefined.isNullOrUndefined(request.body.gasPrice))
			{
				let error =  { 
					isError: true,
					msg: "Error read parameter <gasPrice>"
				};
				response.status(400).json(error);
			}			
			if(isNullOrUndefined.isNullOrUndefined(request.body.value))
			{
				let error =  { 
					isError: true,
					msg: "Error read parameter <value>"
				};
				response.status(400).json(error);
			}	
									
			let walletJson = JSON.stringify(request.body.wallet);	
			let ks = Lightwallet.keystore.deserialize(walletJson);
			let password = request.body.password.toString();
			ks.keyFromPassword(password, function(err, pwDerivedKey) {	
				if(ks.isDerivedKeyCorrect(pwDerivedKey))
				{
					if(ks.getAddresses()[0] == request.body.to)  
					{
						let error = { 
							isError: true,
							msg: "Invalid Recipient"
						};
						response.status(400).json(error);
					}  

					let web3Provider = new HookedWeb3Provider({
						host: "https://mainnet.infura.io/7xNw0DpR7VrQxYmSs303 ",
						transaction_signer: ks
					});		  
					web3.setProvider(web3Provider); 
					
					let nonceNumber = parseInt(web3.eth.getTransactionCount(ks.getAddresses()[0], "pending"));
					let gasprices = parseInt(request.body.gasPrice) * 1000000000;
					let gasLimit = parseInt(request.body.gasLimit);				
					let sendingAddr = ks.getAddresses()[0];
					let value = parseFloat(request.body.value) * 1.0e18   //Address wallet     
					let txOptions = {
						nonce: web3.toHex(nonceNumber),
						gasLimit: web3.toHex(gasLimit),
						gasPrice: web3.toHex(gasprices),
						to: contractAddr
					}
					let arg = Array.prototype.slice.call([request.body.to,value]);   
					let rawTx = txutils.functionTx(contractAbi, 'transfer', arg, txOptions)
					let signedSetValueTx = signing.signTx(ks, pwDerivedKey, rawTx, sendingAddr) 					
					web3.eth.sendRawTransaction('0x' + signedSetValueTx, function(err, hash) { 
						if(!isNullOrUndefined.isNullOrUndefined(err)){
							let error =  { 
								isError: true,
								msg: err
							};
							response.status(400).json(error);							
						}   
						if(!isNullOrUndefined.isNullOrUndefined(hash)){
							let data = {
								isError: false,
								hash: hash						
							};				
							response.status(200).json(data);							
						}
						else
						{							
							let error = { 
								isError: true,
								msg: 'return hash is null'
							};
							response.status(400).json(error);
						}	           
					}); 
				}
				else{	
					let error = {
						isError: true,
						msg: 'Password incorret'						
					};			
					response.status(400).json(error);
				}
			});
		});		
		
		//comunicação com api EtherScan retorna todas as transações nao testado
		this.app.get('/api/transaction/:address',(request, response) => {		
			if(isNullOrUndefined.isNullOrUndefined(request.params.address))
			{
				let error =  { 
					isError: true,
					msg: "Error read parameter <address>"
				};
				response.status(400).json(error);
			}	

			let address = request.params.address;
			let rondom =  Math.floor((Math.random() * 3));
			               
			let endpoint = 'https://api.etherscan.io/api?module=account&action=txlist&address=' + address +'&startblock=0&endblock=99999999&sort=asc&apikey=' + Apikeys[rondom];
			Request(endpoint, function (err, res, body) {
				if (!err) {	
					let transactions = JSON.parse(body);
					let Result = [];					
					for (let index = transactions.result.length -1; index >=0 ; index--) {						

						let isMyTokenValue = "";			

						if(transactions.result[index].to == contractAddress)							
							isMyTokenValue = "1";
						else
							isMyTokenValue = "0";

						var transaction = {	
							blockNumber : transactions.result[index].blockNumber,
							timeStamp : transactions.result[index].timeStamp,
							hash : transactions.result[index].hash,
							nonce : transactions.result[index].nonce,
							from : transactions.result[index].from,
							to : transactions.result[index].to,
							value : transactions.result[index].value,
							gas : transactions.result[index].gas,
							gasPrice : transactions.result[index].gasPrice,
							isError : transactions.result[index].isError,
							cumulativeGasUsed : transactions.result[index].cumulativeGasUsed,
							gasUsed : transactions.result[index].gasUsed,
							confirmations : transactions.result[index].confirmations,
							isMyToken : isMyTokenValue
						};		
						Result.push(transaction);							
					}

					let data = {
						isError: false,
						transactions: Result						
					}				
					response.status(200).json(data);					
				} else {
					let error =  { 
						isError: true,
						msg: err
					};
					response.status(400).json(error);					
				}
			});
		});

		this.app.get('/api/', function (request, response) {
			response.send('Server ON');
		});	

		this.app.post('/api/wallet/mail', function (request, response) {
			if(isNullOrUndefined.isNullOrUndefined(request.body.email))
			{
				let msg = { msg: "Error read parameter <email>"};
				response.status(400).json(msg);
			}	
			else if(isNullOrUndefined.isNullOrUndefined(request.body.wallet))
			{
				let msg =  { msg: "Error read wallet Json"};
				response.status(400).json(msg);
			}						
			else{
				mailer.sendMailWallet(request.body.email, request.body.wallet).then(res => {
					response.status(200).send("sucess");
				}).catch(err => {
					response.status(400).send("err");
				})
			}
		});	

	}

	routesConfig(){
		this.appRoutes();
	}

}

module.exports = Routes;
