//101159615-functions.js
/* GBC:101159615 */

/*Q1
Write a function to return a string that contains random numbers where the length must be equal 
to the value of the parameter. The second parameter contains an array of numbers to omit.
E.G. function(5, [1,7]) returns “20243” (1 or 7 is not present)
*/
//@p1:int @p2:array @return:String
function myQ1(length, exclude) {
	//var exclude = [1,2,3,4,5,6,7];
	var result = "";

	var arry = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

	for (i = 0; i < exclude.length; i++) {

		//var arry = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

		//find posion of exclude.i from arry 
		//var j = arry.indexOf(exclude[i]);
		var j = myIndexOf(exclude[i], arry);

		//splice arry from posion 
		//arry.splice(j,1);
		arry = myArraySplice(j, 1, arry);

	}

	for (i = 0; i < length; i++) {

		//result[i] = arry[Math.floor(Math.random()*arry.length)];
		//result[i].push;

		var tmp = arry[Math.floor(Math.random() * arry.length)];

		result += tmp;


	}

	return result;

}


/*Q2
param1 + param2 - param3 + param4 – param5…and keeps with this pattern. 
If any non-numerical character is encountered, ¼ of its value is computed 
as the numerical value. The result should truncate precision.
E.G. function(11,a,2,30,Z,3) returns 35
11 + (97/4) - 2 + 30 - (122/4) + 3
*/
//@p1:String @return:Array[array,int]
function myQ2(str) {
	//total
	var sum = 0;
	//adder
	var adder = [];
	//convert String to Array
	var arry = myStringToArrayWithSeperator(str, ',');
	//add or substract flag
	var flag = true;

	for (var i = 0; i < arry.length; i++) {

		//if not a number
		if (isNaN(arry[i])) {
			//adder[i] = Math.round(arry[i].charCodeAt(0);
			if (!flag)
				adder[i] = Number([- Math.round(arry[i].charCodeAt(0) / 4)]);
			if (flag)
				adder[i] = Number([Math.round(arry[i].charCodeAt(0) / 4)]);
			sum += adder[i];

		}
		//if is a number
		if (!isNaN(arry[i])) {

			if (!flag)
				adder[i] = Number([-arry[i]]);
			if (flag)
				adder[i] = Number([arry[i]]);
			sum += adder[i];
		}

		//reverse flag;
		if (!i == 0)
			flag = !flag;
	}

	return [adder, sum];



}

/*Q3
Write a function that accepts 3 arrays and returns a string of duplicate elements in
ascending order. Return all alphabetic characters in lowercase.
E.G. function ([ 1,2,3,d], [5, 3, 0, a], [A,d,9]) returns “3,d”
*/
//@p:Array @return:String
function myQ3() {
	var tmpArry = []
	var result = "";
	var tmpStr = "";
	var j = 0;


	//loop arryA
	for (var i = 0; i < arguments[0].length; i++) {

		tmpStr = arguments[0][i];

		//arryA search in ArryB
		if (myIndexOf(tmpStr, arguments[1]) != -1) {
			//find the same element
			var position = myIndexOf(tmpStr, arguments[1]);
			tmpArry[j] = arguments[1][position];
			j++;
		}

		//arryA search arryC
		if (myIndexOf(tmpStr, arguments[2]) != -1) {
			//find the same element
			var position = myIndexOf(tmpStr, arguments[2]);
			tmpArry[j] = arguments[2][position];
			j++;
		}

	}



	//loop arryB
	for (var i = 0; i < arguments[1].length; i++) {

		tmpStr = arguments[1][i];

		//arryB search arryC
		if (myIndexOf(tmpStr, arguments[2]) != -1) {
			//find the same element
			var position = myIndexOf(tmpStr, arguments[2]);
			tmpArry[j] = arguments[2][position];
			j++;
		}

	}
	//convert uppercase to lowercase
	for (var k = 0; k < tmpArry.length; k++) {
		tmpArry[k] = myCharUpperCaseToLowerCase(String(tmpArry[k]));
		//tmpArry[k] = myCharUpperCaseToLowercase('X');
	}
	//sort
	tmpArry = myBubbleSort(tmpArry);
	//convert Array to String
	result = myArrayToStringWithConnector(tmpArry, ",");

	return result;
}



/*Q4
Write a function that accepts an array and a number. The function adds the number
value to each element of the array and returns a string representation of the new
series of characters separated by comma. If the sum of the ASCII value of the
element + number is the same type (odd or even) as the original ASCII value of the
element, increment the value otherwise don't change it.
 
function([2,5,7,C,Z], 5) returns “ 2, 5, 7, C, Z “
-2 is even, 2+5 is odd. Even and odd are not the same type so no change
-5 is odd, 5+5 is even. Odd and even are not the same type so no change
-7 is odd, 7+5 is even. Odd and even are not the same type so no change
-C = 67, which is odd, 67+5 is even. Odd and even are not the same type so no change
-Z = 90, which is even, 90+5 is odd. Even and odd are not the same type so no change
		2(even) 5(odd) = 7(odd)          -
		5(odd)   5(odd) = 10(even)		 -
		7(odd)   5(odd) = 12(even)		 -
		67(odd)  5(odd) = 72(even) 		 -
		90(even)  5(odd) =  95(odd)		 -
function([2,5,7,C,Z], 2) 
 returns “4,5,7,E,\“
		
		2(even) 2(even) = 4(even)        +
		5(odd)   2(even) = 7(odd)		 +
		7(odd)   2(even) = 9(odd)  		 +	
		67(odd)  2(even) = 69(odd) 		 +
		90(even) 2(even) = 92(even)		 +

*/
function myQ4(arry, intAdder) {
	var result = [];

	for (var i = 0; i < arry.length; i++) {

		if (!isNaN(arry[i]))
			result[i] = arry[i] % 2;
		if (isNaN(arry[i]))
			result[i] = arry[i].charCodeAt(0) % 2;

	}


	return result;
}


/*Q5
 Write a function that accepts an array. The function adds each element’s value to the value of the 
 character before it to generate a number. It returns a string of numbers separated by comma. If the 
 value is a digit, use its numerical value. Otherwise, use the character’s ASCII value.
 E.G. function([z, C, 2, 5, 7]) returns “129,189,69,7,12 “
			  [122,67,2,5,7]	
 */
function myQ5(arry) {
	var result = [];
	for (var i = arry.length - 1; i >= 0; i--) {
		if (i != 0)
			result[i] = myLetterToAscii(arry[i - 1]) + myLetterToAscii(arry[i]);
		//result[i] = arry.length ;
		else
			result[i] = myLetterToAscii(arry[arry.length - 1]) + myLetterToAscii(arry[i]);
	}


	return result;
}


/*Q6
Write a function that accepts two arguments (array and a number). 
The function would iterate through the array to find numbers that are divisible by 
the number passed as second argument. The function returns a string containing the 
index positions of divisible elements separated by comma. Return string should not 
end with comma. Make sure the second argument is a Number greater than zero. Otherwise, 
the function should not return anything.:
E.G. function([3, 2, 0, 5, 9, 24, 888, 10], 2); returns: 1, 5, 6, 7
E.G. function([0, , k, 5, 19, 240, 99], 5); returns: 3, 5
*/
function myQ6(arry, num) {
	var result = [];
	var j = 0;
	for (var i = 0; i < arry.length; i++) {
		if ((arry[i] != 0) && (arry[i] % num == 0)) {
			result[j] = i;
			j++;
		}
	}

	//result = num;
	return result;
}

/*Q7
Write a function that accepts three arguments (an array, delimiter, and a number). 
The function would join content of the array, inserting the delimiter after every nth elements of 
the array and returns the result as string:
E.G. function([0, 2, “Hello”, 7, “TO”, “---“], “&”, 2); returns: 02&Hello7&TO---&
function([0, 2, “Hello”, 7, “TO”, “---“], “+”, 3); returns: 02Hello+7TO---+
function([0, 2, “Hello”, 7, “TO”, “---“], “*”, 4); returns: 02Hello7*TO--- 
 if number of elements is 5 [1,2,3,4,5] and delimiter is & and n is 2 return string must be: 12&34&5 
 if number of elements is 6 [1,2,3,4,5,6] and delimiter is & and n is 2 return string must be: 12&34&56&
*/

function myQ7(arry, str, num) {

	var arryTemp = [];
	var strTemp = "";
	var result = "";
	var j = 0;


	//arry = [0, 2, 'Hello', 7, 'TO', '---'];

	for (var i = 0; i < arry.length; i += num) {

		arryTemp[j] = myArraySlice(i, i + num, arry);
		/*rewrite array.toString */
		//strTemp = arryTemp[j].toString();
		strTemp = myArrayToString(arryTemp[j]);

		if (arryTemp[j].length == num)
			strTemp += str;
		for (var k = 1; k <= num; k++)
			/*rewrite string.replace */
			//strTemp = strTemp.replace(",", "");
			strTemp = myStringReplace(strTemp, ',', "");
		j++;
		result += strTemp;
	}

	return result;
}

/*Q8
Write a function that accepts two arguments, an object and an array.
The array contains property names that may exist in the object.
Search object for the properties and if found, concatenate values of those properties,
separated by comma and return as string.
E.G.function(
			{
				name: 'Al',
				age: 22,
				setName: function (a) { this.name = a }
			},
			['name', 'age']
		);
returns: Al, 22
E.G.function(
	{ name: 'Tom', age: 18 },
	['name', 'phone', 'address']
);
returns: Tom
 */

//@p1 Object @p2 Array @return String
function myQ8(obj, arry) {
	var result = "";
	for (var i = 0; i < arry.length; i++) {

		if (obj.hasOwnProperty(arry[i]))
			result += obj[arry[i]];
		if (obj.hasOwnProperty(arry[i + 1]))
			result += ",";

	}
	return result;
}


/*Q9
Write a function that would accept an string and checks if any character is repeated more than once.
The function would return the repeated chars and the number of times they are repeated. 
The return value is a string, all pairs separated by comma.
E.G. function(“2abc**zac22”); returns: 2=3,a=2,c=2,*=2,
 */
function myQ9(str) {
	var result = "";
	var arryTemp = [];
	var arryUniq = [];



	for (var i = 0; i < str.length; i++) {
		var charI = str.charAt(i);
		var intCount = myCountChatInString(charI, str);
		//console.log(myCountChatInString(str.charAt(i), str) >1);
		//if char in the string
		if (intCount > 1) {


			if (arryUniq.length == 0) {
				arryUniq[arryUniq.length] = charI;
				arryTemp[arryTemp.length] = [charI, intCount];
			}
			/* arryUniq[arryUniq.length ] = myIndexOf(charI, arryUniq) */
			if (myIndexOf(charI, arryUniq) == -1) {
				arryUniq[arryUniq.length] = charI;
				arryTemp[arryTemp.length] = [charI, intCount];

			}
		}



	}
	var strTemp = "";
	for (var j = 0; j < arryTemp.length; j++) {
		strTemp += myArrayToStringWithConnector(arryTemp[j], "=");
		strTemp += ",";

	}


	//result = arryUniq;
	result = strTemp;
	return result;
}

/*Q10
Write a function that converts the alphabetical characters of first half of each argument
to uppercase and returns the result as one string. Number(s) and special chars are ignored.
If the length of string is not even, append an extra “-“ (hyphen) to end of it to make it even.
E.G.function(“We&are*well”, “2, That is gr8.”, 33, [‘abcd’, 3, ‘4k2go’]);
	 returns: WE&ARE*well-2, THAT is gr8.- 33, ABcd34K2go - 
*/
//@p1:String @p2:String @p3:int @p4:Array @return:String
function myQ10() {
	var result = "";
	
	var strTemp = "";
	var charTemp = "";
	var arryTemp = [];
	var arryLength = -1;
	//arguments
	for (var i = 0; i < arguments.length; i++) {
		if(isNaN(arguments[i]))
			arryLength = arguments[i].length;
		else 
			arryLength = 1;
		for (var j = 0; j < arryLength; j++) {
			//Convert Arguments[] to String
			arryTemp = myStringToArrayWithNoSeperator(String(arguments[i]));
			for (var k = 0; k < arryLength; k++) {
				//charTemp =  arryTemp[k];
				if (k <= (arryTemp.length) / 2)
					arryTemp[k] = myCharLowerCaseToUpperCase(arryTemp[k]);
				if ((arryTemp.length) % 2 == 1)
					arryTemp[arryTemp.length] = "-";

			}
		}
		result += myArrayToString(arryTemp);

	}
	//result = myCheckLetterInString(charTemp);
	//result = charTemp;

	return result;
}


//selector
var $ = function (name) {

	return document.getElementById(name);

}
//convert LowerCase to UpperCase
//@p1:Char @return:Char
function myCharLowerCaseToUpperCase(char) {
	var result = "";
	var intChar = char.charCodeAt(0);
	//if is Letter
	if ((intChar > 96 && intChar < 123))
		//to lowerCase	
		intChar -= 32;
	result = String.fromCharCode(intChar);
	return result;
}

//array.push
function myArrayPush(str, arry) {
	arry[arry.length] = str;
	return arry;

}


//myCheckLetterInString
//@p1:String @return:Boolean
function myCheckLetterInString(str) {
	var result = undefined;
	//if (str.charCodeAt())
	var temp = 0;
	temp = str.charCodeAt(0);
	if (temp > 64 && temp < 91 && temp > 96 && temp < 123)
		result = true
	else
		result = false;
	return result;
}

//myCharInString(chart,string)
//@p1:chat @p2:string @return:int
function myCountChatInString(char, str) {
	var result = 0;
	for (var i = 0; i < str.length; i++) {
		if (char == str.charAt(i))
			result += 1;
	}
	return result;
}

//Convert uppercase to lowercase .
//@p1:Char @return:Char
function myCharUpperCaseToLowerCase(char) {
	var result = "";
	var intChar = char.charCodeAt(0);
	//if is Letter
	if ((intChar > 64 && intChar < 91))
		//to lowerCase	
		intChar += 32;
	result = String.fromCharCode(intChar);
	return result;
}



//replace oldChar with newChar in string
//@p1:String @p2:Char @p3:Char @return:string
function myStringReplace(str, charOld, charNew) {
	var result = "";
	var arryTemp = [];
	var strTemp = "";
	var j = 0;
	for (var i = 0; i < str.length; i++) {
		arryTemp[j] = str.charAt(i);
		j++
	}

	for (var k = 0; k < arryTemp.length; k++) {

		if (charOld == arryTemp[k])
			strTemp += charNew;
		else
			strTemp += arryTemp[k]

	}
	result = strTemp;

	return result;
}


//ArrayToString
//@p1:Array @return:String
function myArrayToString(arry) {
	var result = "";
	for (var i = 0; i < arry.length; i++) {
		result += String(arry[i]);
	}
	return result;
}

//ArrayToStringWithConnector
//@p1:Array @p2:str @return:String
function myArrayToStringWithConnector(arry, str) {
	var result = "";
	for (var i = 0; i < arry.length; i++) {
		result += String(arry[i]);
		if (i < arry.length - 1)
			result += str;
	}
	return result;
}


//Convert String To Array With Seperator
//@p1:String @p2:Seperator @return Array
function myStringToArrayWithSeperator(inputString, strSeperator) {
	var strArray = [];
	var tmpStr = "";
	for (var i = 0; i < inputString.length; i++) {
		if (inputString.charAt(i) == strSeperator) {
			//strArray.push(tmpStr);
			myArrayPush(tmpStr, strArray);
			tmpStr = "";
			continue;
		}
		tmpStr += inputString.charAt(i);
	}
	//strArray.push(tmpStr);
	myArrayPush(tmpStr, strArray);
	return strArray;

}

//Convert String To Array no Seperator
//@p1:String  @return Array
function myStringToArrayWithNoSeperator(inputString) {
	inputString = myNumToString(inputString);
	var strArray = [];
	var tmpStr = "";
	for (var i = 0; i < inputString.length; i++) {
		tmpStr = inputString.charAt(i);
		myArrayPush(tmpStr, strArray);
	}
	return strArray;
}

//if num is number, Convert Number to String ;if is not number, return itself;
//@p1:num @return String
function myNumToString(num) {
	var result = "";
	if (!isNaN(num))
		result = String(num);
	if (isNaN(num))
		result = num;
	return result;
}




//another indexOf(str,arry)
//@p1:string @p2:array @return int
function myIndexOf(str, arry) {

	for (var i = 0; i < arry.length; i++) {
		if (str == arry[i])
			return i

	}
	return -1;
}
//another myArry.Splice @return remain array
function myArraySplice(start, length, array) {
	var result = [];
	var j = 0;

	//from 0 to start
	for (var i = 0; i < start; i++) {

		result[j] = array[i];
		j++;

	}
	//start to length
	for (i = start; i < array.length - length; i++) {

		result[j] = array[i + length];
		j++;

	}


	return result;
}

//another myArraySlice 
//@return selected elements in new array
function myArraySlice(numStart, numEnd, arry) {

	var result = [];
	var j = 0;
	if (numEnd > arry.length)
		numEnd = arry.length;

	for (var i = numStart; i < numEnd; i++) {

		result[j] = arry[i];
		j++;
	}
	return result;
}




//myBubbleSort(arry)
//@p1:Array @return:Array
function myBubbleSort(arry) {
	var len = arry.length;
	for (var i = len - 1; i >= 0; i--) {
		for (var j = 1; j <= i; j++) {
			if (arry[j - 1] > arry[j]) {
				var temp = arry[j - 1];
				arry[j - 1] = arry[j];
				arry[j] = temp;
			}
		}
	}
	return arry;
}

//String to ASCII ,number to number , letter to ASCII 
//@p1:str @p2:str
function myLetterToAscii(str) {
	var result = "";
	if (!isNaN(str))
		result = str;
	if (isNaN(str))
		result = str.charCodeAt(0);
	return result;
}
