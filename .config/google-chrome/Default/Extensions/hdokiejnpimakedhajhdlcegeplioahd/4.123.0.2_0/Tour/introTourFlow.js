var ActionEvents=function(){"use strict";var t=function(){this.actions={}};return t.prototype.subscribeToAction=function(t,e){t&&e&&(this.actions[t]?this.actions[t].push(e):this.actions[t]=[e])},t.prototype.unSubscribeActionFn=function(t,e){var e;t&&this.actions[t]&&0<=(e=this.actions[t].indexOf(e))&&delete this.actions[t][e]},t.prototype.unSubscribeAllAction=function(t){t&&this.actions[t]&&delete this.actions[t]},t.prototype.triggerAction=function(t){if(t&&this.actions[t])for(var e=0;this.actions.hasOwnProperty(t)&&e<this.actions[t].length;e++)this.actions[t][e]&&"function"==typeof this.actions[t][e]&&this.actions[t][e](arguments)},t}(),IntroTourFlow=function(s,e,n,o,i,r,a){"use strict";var p=function(t){p.prototype.setup(t)};return p.prototype.setup=function(t){if(!t||!t.tour||!t.tour.steps||0===t.tour.steps.length)throw new Error("Steps Array needs to have at least one step");this.tourName=t.name,this.steps=t.tour.steps,this.exitStep=t.tour.exitStep,this.welcomeStep=t.tour.welcomeStep,this.laterStep=t.tour.laterStep,this.isLater=t.isLater,this.lastIndexComplete=this.currentStepIndex=-1,this.currentStep=null,this.actionEvents=new e,this.pingManager=new i({steps:this.steps}),this.tagManager=new a(this.steps),this.invisibleShade=new r({shadeClass:"invisible-shade"}),this.darkShade=new r({shadeClass:"dark-shade"})},p.prototype.getFirstStep=function(){return 0<this.steps.length?(this.currentStepIndex=0,this.steps[this.currentStepIndex]):null},p.prototype.getLastStep=function(){return 0<this.steps.length?this.steps[this.steps.length-1]:null},p.prototype.getNextStep=function(){return this.hasNextStep()?this.steps[++this.currentStepIndex]:null},p.prototype.getPreviousStep=function(){return this.hasPreviousStep()?this.steps[--this.currentStepIndex]:null},p.prototype.getExitStep=function(){return this.exitStep},p.prototype.hasNextStep=function(){return this.currentStepIndex+1<this.steps.length},p.prototype.hasPreviousStep=function(){return 0<=this.currentStepIndex-1},p.prototype.setCurrentStep=function(t){this.currentStep=t,this.currentStepIndex=-1;for(var e=0;e<this.steps.length;e++)if(this.steps[e]===t){this.currentStepIndex=e;break}return this.currentStepIndex},p.prototype.goToStep=function(t){var e;t&&(s.tourDialogBase.open({options:t,flow:this}),this.setCurrentStep(t),-1!==this.currentStepIndex&&(this.lastIndexComplete=this.currentStepIndex,this.pingManager.showAllFuture(this.currentStepIndex),this.tagManager.showAllFuture(this.currentStepIndex)),t.openAction&&"function"==typeof t.openAction&&t.openAction(),t.shadeOn&&(this.invisibleShade.show(),this.darkShade.show()),t.shadeOff&&(this.invisibleShade.hide(),this.darkShade.hide()),e=this,t.autoClose)&&0<t.autoClose&&(e.isCurrentStepClosed=!1,setTimeout(function(){e.isCurrentStepClosed||(e.closeCurrentStep(),e.executeAction("close"))},t.autoClose))},p.prototype.closeCurrentStep=function(){this.isCurrentStepClosed=!0,s.tourDialogBase.close(!0),this.pingManager.hideAll(),this.currentStep&&this.currentStep.closeAction&&"function"==typeof this.currentStep.closeAction&&this.currentStep.closeAction()},p.prototype.startFlow=function(t){t?this.executeAction("start",t):this.isLater&&this.laterStep?this.goToStep(this.laterStep):(this.goToStep(this.welcomeStep),o.sendLpImprove("vaulttour",{version:this.tourName})),n.get(n.ESCAPE).subscribe(this.getEscapeHandler())},p.prototype.getEscapeHandler=function(){var e=this;return e.escapeHandler||(e.escapeHandler=function(t){t.openDialogCount<2&&(e.closeCurrentStep(),e.executeAction(0<=e.lastIndexComplete?"exit":"close"))}),e.escapeHandler},p.prototype.executeAction=function(t,e){switch(t){case"start":this.goToStep(this.getFirstStep()),this.invisibleShade.show(),this.darkShade.show(),!0===e?o.sendLpImprove("vaulttour::start",{version:this.tourName,source:"help"}):(o.sendLpImprove("vaulttour::choice",{version:this.tourName,choice:t}),o.sendLpImprove("vaulttour::start",{version:this.tourName,source:"welcome"}));break;case"next":this.goToStep(this.getNextStep());break;case"next-scroll":var s=document.getElementById("leftMenu"),i=s.offsetHeight;s.scroll({top:i,left:0,behavior:"auto"}),this.goToStep(this.getNextStep());break;case"previous":this.goToStep(this.getPreviousStep());break;case"exit":this.goToStep(this.getExitStep());break;case"later":case"never":this.invisibleShade.cleanup(),this.darkShade.cleanup(),o.sendLpImprove("vaulttour::choice",{version:this.tourName,choice:t});break;case"close":this.invisibleShade.cleanup(),this.darkShade.cleanup(),n.get(n.ESCAPE).unsubscribe(this.escapeHandler),0<=this.lastIndexComplete&&o.sendLpImprove("vaulttour::exit",{version:this.tourName,page:this.lastIndexComplete+1,action:e&&"string"==typeof e?e:"close"});break;default:"function"==typeof t&&t.bind(this)()}this.actionEvents&&this.actionEvents.triggerAction(t)},p.prototype.cleanup=function(){this.invisibleShade&&(this.invisibleShade.cleanup(),delete this.invisibleShade),this.darkShade&&(this.darkShade.cleanup(),delete this.darkShade),this.pingManager&&(this.pingManager.cleanup(),delete this.pingManager),this.tagManager&&(this.tagManager.cleanup(),delete this.tagManager),this.currentStep=null,delete this.steps,delete this.exitStep,delete this.welcomeStep,delete this.laterStep},p.prototype.subscribeToAction=function(t,e){this.actionEvents.subscribeToAction(t,e)},p.prototype.unSubscribeAction=function(t){this.actionEvents.unSubscribeAllAction(t)},p}(dialogs,ActionEvents,Topics,bg,lpPingManager,IntroTourShade,lpTagManager);