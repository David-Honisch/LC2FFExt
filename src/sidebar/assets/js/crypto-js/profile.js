var pwd = "secret key 123";
var imprintindex = [
"U2FsdGVkX19JokGFRqdwimhEITHhLwad0h4SCZYU+JM=",
"U2FsdGVkX19PYgPlcBJsnTvB66nVbzWHakvYpxxjUUJXCLUzrU9IYR9GS6bn+ebc",
"U2FsdGVkX19XSSPDuk/twSPP7chzIGxrAoIh36/6H68=",
"U2FsdGVkX1+zPWS+NnSbtDTYvd6mm/KsT6DWPR0F0QM=",
"U2FsdGVkX1+m3eYTkD4hAEfyqz7PAstMIFUDCSir290XAwXeuUcspTztxonsaIgX1Av3m1X84ahCtISbDP3n0VJVZo0j501H6J1Nfrtg0Yo=",
"U2FsdGVkX19QCFaHRpshY0VWTNAX5Iua/QWsdzFwzf6FNMXuoXw7mvBybPk3UTWanJpOcggS+EVhMwDE9CZ639jUCYbfH4JfUpy8XGYPTs20UMI7bKFDn2X8V4rAn6WY"
];
imprintindex.forEach(function (s, i, o) {
	$("#imprintprofile").append(CryptoJS.AES.decrypt(s.toString(), pwd).toString(CryptoJS.enc.Utf8));
	$("#imprintprofile").append("<br/>");
});