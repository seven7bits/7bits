define(function(require) {

	var qrGen = require('qr');

	return require("marionette").ItemView.extend({
		tagName: 'div',

		template: '#template-qr',
		events: {
			'click #qr-link': 'generateCode'
		},

		ui: {
			'image': '#qr-image',
			'link': '#qr-link'
		},

		initialize: function(){
			this.generated = false;
		},

		generateCode: function(){
			if (!this.generated){
				new QRCode(this.ui.image[0], { 
						colorDark : "#08C",
						colorLight : "#FFF",
						text: window.location.href});
				this.$('canvas').remove();
				this.generated = true;
				this.ui.link.text('Hide QR Code');
			} else {
				this.ui.image.empty();
				this.ui.link.text('Get QR Code for quick access');
				this.generated = false;
			}
		}
	});
});
