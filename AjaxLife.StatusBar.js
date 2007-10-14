/* Copyright (c) 2007, Katharine Berry
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Katharine Berry nor the names of any contributors
 *       may be used to endorse or promote products derived from this software
 *       without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY KATHARINE BERRY ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL KATHARINE BERRY BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 ******************************************************************************/

AjaxLife.StatusBar = function() {
	var div_ld = false;
	var balance = false;
	
	return {
		init: function() {
			div_ld = $(document.createElement('div'));
			div_ld.setStyle({'float': 'right', color: '#00e752'});
			div_ld.appendChild(document.createTextNode(_('StatusBar.LindenDollarSymbol')+_('StatusBar.Loading')));
			$('statusbar').appendChild(div_ld);
			
			AjaxLife.Network.MessageQueue.RegisterCallback('MoneyBalanceReplyReceived', function(data) {
				div_ld.update(_('StatusBar.LindenDollarSymbol')+AjaxLife.Utils.FormatNumber(data.Balance));
				balance = data.Balance;
				if(data.Description != '')
				{
					AjaxLife.Widgets.Ext.msg("",data.Description);
				}
			});
			
			AjaxLife.Network.MessageQueue.RegisterCallback('BalanceUpdated', function(data) {
				div_ld.update(_('StatusBar.LindenDollarSymbol')+AjaxLife.Utils.FormatNumber(data.Balance));
				balance = data.Balance;
			});
			
			AjaxLife.Network.Send('RequestBalance', {});
		}
	};
}();