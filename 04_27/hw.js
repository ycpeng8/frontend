// 1
function reverseNo(n) {
    n_string = n.toString();
    n_string_reversed = n_string.split("").reverse().join("");
    return parseFloat(n_string_reversed) * Math.sign(n);
}

// 2
function checkPalindrome(str) {
    str = str.toLowerCase();
    str_reversed = str.split("").reverse().join("");
    return str == str_reversed;
}

// 3
function genCombination(str) {
    let result = [];
    for (let i = 0; i < str.length; i++) {
        result.push(str[i]);
        for (let j = i + 1; j < str.length; j++) {
            result.push(str[i] + str[j]);
        }
    }
    return result;
}

// 4
function alphabetSort(str) {
    return str.split("").sort().join("");
}

// 5
function firstLetterUppercase(str) {
    let result = "";
    let words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
        result += words[i][0].toUpperCase() + words[i].slice(1) + " ";
    }
    return result;
}

// 6
function findLongestWord(str) {
    let words = str.split(" ");
    let longestWord = words[0];
    for (let i = 1; i < words.length; i++) {
        if (words[i].length > longestWord.length) {
            longestWord = words[i];
        }
    }
    return longestWord;
}

// 7
function countVowel(str) {
    let count = 0;
    let vowels = "aeiou";
    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i].toLowerCase())) {
            count++;
        }
    }
    return count;
}

// 8
function isPrime(n) {
    if (n < 2) {
        return false;
    }

    for (let i = 2; i < n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

// 9
function typeOf(obj) {
    return typeof obj;
}

// 10
function identityMatrix(n) {
    let result = [];
    for (let i = 0; i < n; i++) {
        let row = [];
        for (let j = 0; j < n; j++) {
            if (i == j) {
                row.push(1);
            } else {
                row.push(0);
            }
        }
        result.push(row);
    }
    return result;
}

// 11
function findSndLowestAndGreatest(arr) {
    let sortedArr = arr.sort();
    let result = [];
    let sndLowest = sortedArr[1];
    let sndGreatest = sortedArr[sortedArr.length - 2];
    result.push(sndLowest, sndGreatest);
    return result;
}

// 12
function isPerfect(n) {
    let sum = 0;
    for (let i = 1; i < n; i++) {
        if (n % i == 0) sum += i;
    }
    return sum == n;
}

// 13
function computeFactors(n) {
    let result = [];
    for (let i = 1; i <= n; i++) {
        if (n % i == 0) result.push(i);
    }
    return result;
}

// 14
function convert2Coins(n) {
    let result = [];
    let coins = [25, 10, 5, 2, 1];
    for (let i = 0; i < coins.length; i++) {
        while (n >= coins[i]) {
            result.push(coins[i]);
            n -= coins[i];
        }
    }
    return result;
}

// 15
function computeExp(b, n) {
    return b ** n;
}

// 16
function findUnique(str) {
    let result = [];
    for (let i = 0; i < str.length; i++) {
        if (!result.includes(str[i])) {
            result.push(str[i]);
        }
    }
    return result.join("");
}

// 17
function findOccurrences(str) {
    let result = {};
    for (let i = 0; i < str.length; i++) {
        if (str[i] == " ") continue;
        if (result[str[i]]) {
            result[str[i]]++;
        } else {
            result[str[i]] = 1;
        }
    }
    return result;
}

// 18
function binarySearch(arr, n) {
    let start = 0;
    let end = arr.length - 1;
    let mid = Math.floor((start + end) / 2);
    while (arr[mid] != n && start <= end) {
        if (n < arr[mid]) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
        mid = Math.floor((start + end) / 2);
    }
    return arr[mid] == n ? mid : -1;
}

// 19
function findLargerNumbers(arr, n) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > n) result.push(arr[i]);
    }
    return result;
}

// 20
function genRandomString(n) {
    let result = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < n; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

// 21
function getSubsets(arr, n) {
    let subsets = [];
    for (let i = 0; i < arr.length; i++) {
      if (n === 1) {
        subsets.push([arr[i]]);
      } else {
        let subsubsets = getSubsets(arr.slice(i+1), n-1);
        for (let j = 0; j < subsubsets.length; j++) {
          subsets.push([arr[i], ...subsubsets[j]]);
        }
      }
    }
    return subsets;
  }

// 22
function countLetterOccurrence(str, letter) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] == letter) count++;
    }
    return count;
}

// 23
function findFstNotRepeatedChar(str) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
        if (countLetterOccurrence(str, str[i]) == 1) {
            result = str[i];
            break;
        }
    }
    return result;
}

// 24
function bubbleSort(arr) {
    let swapped = true;
    do {
        swapped = false;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < arr[i+1]) {
                let temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
    return arr;
}

// 25
function findLongestCountryName(countries) {
    let longest = countries[0];
    for (let i = 1; i < countries.length; i++) {
        if (countries[i].length > longest.length) {
            longest = countries[i];
        }
    }
    return longest;
}

// 26
function findLongestSubstringWithourRepeat(str) {
    let result = "";
    let longest = "";
    for (let i = 0; i < str.length; i++) {
        if (!result.includes(str[i])) {
            result += str[i];
        } else {
            if (result.length > longest.length) {
                longest = result;
            }
            result = str[i];
        }
    }
    return longest;
}

// 27
function findLongestPalindrome(str) {
    let longest = "";
    let n = str.length;
    let j;
    let subs = "";
    let subsrev = "";
    for(let i = 0; i < n; i++){
        j = n-1;
        while(i < j){
            if((str[i] == str[j]) && (longest.length < (j-i+1))){
               subs = str.substring(i,(j+1));
               subsrev = subs;
               subsrev=subsrev.split('').reverse().join('');
               if(subs == subsrev){
                  longest = subs;
                  break;
               }
            }
            j--;
        }
    }
    if(longest.length == 0){
        longest = str[0];
    }
    return longest;
}

// 28
function passFunctionAsParam(func) {
    return func();
}

// 29
function getFunctionName(func) {
    return func.name;
}
