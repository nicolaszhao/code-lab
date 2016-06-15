var timeHelper = {
	getTimeFromStr: function(time) {
		var date = new Date();

		time = time.split(':');
		date.setHours(time[0]);
		date.setMinutes(time[1]);

		if (time.length >= 3) {
			date.setSeconds(time[2]);
		}

		return date;
	},

	getTime: function(time) {
		time = +time;

		var hours = Math.floor(time / (1000 * 60 * 60)),
			minutes = Math.floor(time / (1000 * 60)) - hours * 60,
			second = Math.floor(time / 1000) - hours * 60 * 60 - minutes * 60;

		return {
			hours: hours,
			minutes: minutes,
			second: second
		};
	},

	getTimeDif: function(start, end) {
		if (!(start instanceof Date) || !(end instanceof Date)) {
			return null;
		}

		var dif = end - start;

		if (dif <= 0) {
			return null;
		}

		return this.getTime(dif);
	},

	getTimeOver: function(start, end, base) {
		if (!this.getTimeDif(start, end)) {
			return null;
		}

		base = base * 60 * 60 * 1000;

		var t = end - start,
			dif = t - base,
			ret = {},
			time;

		if (dif === 0) {
			return null;
		}

		ret.over = dif > 0;
		ret.value = Math.abs(dif);
		time = this.getTime(ret.value);

		ret.hours = time.hours;
		ret.minutes = time.minutes;
		ret.second = time.second;

		return ret;
	}
};

var injectCSS = function(styles, document) {
	var text = '',
		i = 0,

		loadStyle = function(css) {
			var style = document.createElement('style');

			style.type = 'text/css';

			try {
				style.appendChild(document.createTextNode(css));
			} catch (ex) {
				style.styleSheet.cssText = css;
			}

			document.getElementsByTagName('head')[0].appendChild(style);
		};

	for (; i < styles.length; i++) {
		text += styles[i].selector.join(',');
		text += '{';
		for (var rule in styles[i].rules) {
			text += rule + ':';
			text += styles[i].rules[rule] + ';';
		}
		text += '}';
	}

	loadStyle(text);
};

var rtimerange = /^(\d\d:\d\d)~(\d\d:\d\d)$/;

var manhour = {
	formatTimeValue: function(value) {
		var ret = [];

		if (value.hours) {
			ret.push(value.hours + '小时');
		}
		if (value.minutes) {
			ret.push(value.minutes + '分钟');
		}

		return ret.join(', ');
	},
	style: function() {
		injectCSS([
			{
				selector: ['.hr-time'],
				rules: {
					display: 'block',
					margin: '3px',
					padding: '5px',
					'font-size': '14px',
					'text-align': 'center',
					'border-radius': '4px',
					background: 'rgba(255,255,255,.9)'
				}
			},
			{
				selector: ['.hr-time-qualified'],
				rules: {
					color: '#390',
					border: 'solid 1px #5C993D'
				}
			},
			{
				selector: ['.hr-time-normal'],
				rules: {
					color: '#333',
					border: 'solid 1px #ccc'
				}
			},
			{
				selector: ['.hr-time-warning'],
				rules: {
					color: '#f30',
					border: 'solid 1px #FF6F52'
				}
			},
			{
				selector: ['.hr-time-highlight'],
				rules: {
					display: 'block',
					'font-weight': 'bold'
				}
			},
			{
				selector: ['.hr-time-tips'],
				rules: {
					padding: '10px',
					position: 'fixed',
					right: '5px',
					bottom: '5px',
					'font-size': '16px',
					'font-weight': 'bold',
					'line-height': 1.2,
					'border-radius': '4px',
					'box-shadow': '0 0 4px 4px rgba(0,0,0,.2)',
					background: 'rgba(255,255,255,.9)'
				}
			}
		], this.$doc.get(0));
	},
	renderItem: function(i, el) {
		var $el = $(el),
			timeText = $.trim($el.text()),
			match = rtimerange.exec(timeText),
			value, start, end, overTime, $time;

		if (!match || match.length !== 3) {
			return;
		}

		start = timeHelper.getTimeFromStr(match[1]);
		end = timeHelper.getTimeFromStr(match[2]);
		value = timeHelper.getTimeDif(start, end);

		this.total += end - start;

		$time = $('<span />', {
			'class': 'hr-time',
			'text': value.hours + '小时, ' + value.minutes + '分钟'
		}).appendTo($el).addClass(value.hours < 9 ? 'hr-time-warning' : 'hr-time-qualified');

		overTime = timeHelper.getTimeOver(start, end, 9);

		if (overTime) {
			$time.append('<span class="hr-time-highlight">' +
				(overTime.over ? '超时' : '缺少') + this.formatTimeValue(overTime) +
				'</span>');

			this['overTime' + (overTime.over ? 'Passing' : 'Missing')] += overTime.value;
		}
	},
	renderTips: function() {
		this.$doc.find('body').find('.hr-time-tips').remove();

		var dif = this.overTimePassing - this.overTimeMissing,
			$tips = $('<div />', {
				'class': 'hr-time-tips'
			})
				.appendTo(this.$doc.find('body')),

			tips, value;

		if (dif > 0) {
			tips = '已经超过';
			$tips.addClass('hr-time-qualified');
		} else if (dif === 0) {
			tips = '处于正常';
			$tips.addClass('hr-time-normal');
		} else {
			tips = '还需补时';
			$tips.addClass('hr-time-warning');
		}

		if (dif !== 0) {
			tips += '“' + this.formatTimeValue(timeHelper.getTime(Math.abs(dif))) + '”';
		}

		tips += '！';
		$tips
			.append('<h3>本月工时总计：' + this.formatTimeValue(timeHelper.getTime(this.total)) + '</h3>').end()
			.append('<p>你的工时状态：' + tips + '</p>');
	},
	render: function($el) {
		var $items = $el.find('table.listAC').find('tr:eq(1) td');

		this.total = 0;
		this.overTimePassing = 0;
		this.overTimeMissing = 0;
		$items.each(this.renderItem.bind(this));
		this.renderTips();
	},
	listen: function(callback) {
		var that = this;

		this.$doc.on('click', '#BtnQuery', function() {
			var $grid = $(this).closest('table').closest('tr').next().find('td').eq(1),
				modifiedTimer;

			$grid.on('DOMSubtreeModified', function() {
				clearTimeout(modifiedTimer);
				modifiedTimer = setTimeout(function() {
					$grid.off('DOMSubtreeModified');

					callback($grid);
				}, 25);
			});
		});
	},
	create: function() {
		var $frame = $('frame[name="Main"]'),
			that = this;

		$frame.on('load', function() {
			that.$doc = $frame.contents();
			that.style();
			that.listen(that.render.bind(that));
		});
	}
};

$(function() {
	manhour.create();
});