'use strict';

document.addEventListener('DOMContentLoaded', function() {
	copyText.init()
});

var copyText = {
	init: function() {
		if (document.querySelectorAll('[data-copy-text]').length) {
			var cp = document.querySelectorAll('[data-copy-text]');

			for (var i = 0, l = cp.length; i < l; i++) {
				copyText.addCopy(cp[i]);
			}
		}
	},
	addCopy: function(el) {
		if (typeof el !== 'undifined') {
			var parent = el.parentNode;
			if (!parent.querySelectorAll('span.copy-btn').length && window.getSelection) {
				var cpBtn = document.createElement('I');

				parent.setAttribute('style', 'position:relative');
				parent.appendChild(cpBtn);

				cpBtn.classList.add('material-icons');
				cpBtn.textContent = 'content_copy';
				cpBtn.setAttribute('title', 'Copy Text');

				copyText.addCopyEvent(cpBtn, el);
			}
		}
	},
	addCopyEvent: function(btn, el) {
		var coppied = false;
		var timer = 0;

		function copyText() {
			function showCheckmark() {
				btn.textContent = 'check';
				btn.classList.add('active');
			}

			function hideCheckmark() {
				btn.classList.remove('active');
				btn.textContent = 'content_copy';
				timer = 0;
			}
			
			if (timer === 0) {
				if (window.getSelection) {
					var selection = window.getSelection();
					var range = document.createRange();
					range.selectNodeContents(el);
					selection.removeAllRanges();
					selection.addRange(range);

					try {
						document.execCommand('copy');
						coppied = true;
					} catch (err) {
						console.error(err);
					}

					selection.removeAllRanges();
				} else {
					console.error('your browser does not support copy');
				}

				if (coppied) {
					clearTimeout(timer);
					showCheckmark();
					timer = setTimeout(hideCheckmark, 2000);
				}
			}
		}

		if (typeof btn !== 'undifined' && typeof el !== 'undifined') {
			btn.addEventListener('click', copyText, false);
		}
	},
}