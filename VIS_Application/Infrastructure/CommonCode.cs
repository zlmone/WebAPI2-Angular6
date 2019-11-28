using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Web;
using VIS_Domain.Master.Configuration;
using System.Net.Http;
using System.IO;
using System.Security.Cryptography;

namespace VIS_App.Infrastructure
{
    public class CommonCode
    {
        string[] key = new string[5];
        DataSet ds = new DataSet();
        private static Random random = new Random();

        public string GenrateUniqueKey(SecurityKey _SecurityKey)
        {
            string UniqueKey;

            key[0] = StringToBinary(_SecurityKey.Key1.ToString().Trim());
            key[1] = StringToBinary(_SecurityKey.Key2.ToString().Trim());
            key[2] = StringToBinary(_SecurityKey.Key3.ToString().Trim());
            key[3] = StringToBinary(_SecurityKey.Key4.ToString().Trim());
            key[4] = StringToBinary(_SecurityKey.Key5.ToString().Trim());

            string s = AddBinary(key[4], AddBinary(key[3], AddBinary(key[2], AddBinary(key[1], key[0]))));
            //--------------------------------------- Add value in the key to increase the size -------------
            char[] a = s.ToCharArray();
            Array.Reverse(a);
            string RKey = new string(a);

            byte[] Ascii = Encoding.ASCII.GetBytes(BinaryToString(RKey));

            for (int i = 0; i < Ascii.Length; i++)
            {
                if (Ascii[i] < 33 || Ascii[i] > 126)
                {
                    RKey = AddBinary(RKey, "01101101011000010111100101110101");
                    break;
                }
            }

            //_SecurityKey.UniqueKey = BinaryToString(s) + BinaryToString(RKey);
            UniqueKey = BinaryToString(s) + BinaryToString(RKey);



            for (int i = 0; i < Ascii.Length; i++)
            {
                if (Ascii[i] < 33 || Ascii[i] > 126)
                {
                    // Error Message
                    break;
                }
            }
            //return _SecurityKey;

            return UniqueKey;


        }

        public string AddBinary(String a, String b)
        {
            Char[] one = new char[32];
            Char[] two = new char[32];
            one = a.ToCharArray();
            two = b.ToCharArray();
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < 32; i++)
            {
                if ((one[i] == '0' && two[i] == '0') || (one[i] == '1' && two[i] == '1'))
                {
                    sb.Append('0');
                }
                else
                {
                    sb.Append('1');
                }
            }
            return sb.ToString();
        }

        public static string StringToBinary(string data)
        {
            StringBuilder sb = new StringBuilder();

            foreach (char c in data.ToCharArray())
            {
                sb.Append(Convert.ToString(c, 2).PadLeft(8, '0'));
            }
            return sb.ToString();
        }

        public static string BinaryToString(string data)
        {
            List<Byte> byteList = new List<Byte>();

            for (int i = 0; i < data.Length; i += 8)
            {
                byteList.Add(Convert.ToByte(data.Substring(i, 8), 2));
            }

            return Encoding.ASCII.GetString(byteList.ToArray());
        }
        
        public static string GetRandomNumber(int length)
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*/";
            var result = new string(
                Enumerable.Repeat(chars, length)
                          .Select(s => s[random.Next(s.Length)])
                          .ToArray());

            return result;
        }


        public static string Encrypt(string strData, string strKey)
        {
            string strValue = "";
            if (strKey != "")
            {
                if (strKey.Length == 16)
                {
                    strKey = strKey + "XXXXXXXXXXXXXXXX".Substring(0, 16 - strKey.Length);
                }
                else if (strKey.Length == 16)
                {
                    strKey = strKey.Substring(0, 16);
                }
                byte[] byteKey = Encoding.UTF8.GetBytes(strKey.Substring(0, 8));
                byte[] byteVector = Encoding.UTF8.GetBytes(strKey.Substring(strKey.Length - 8));
                byte[] byteData = Encoding.UTF8.GetBytes(strData);
                System.Security.Cryptography.DESCryptoServiceProvider objDES = new DESCryptoServiceProvider();
                MemoryStream objMemoryStream = new MemoryStream();
                CryptoStream objCryptoStream = new CryptoStream(objMemoryStream, objDES.CreateEncryptor(byteKey, byteVector), CryptoStreamMode.Write);
                objCryptoStream.Write(byteData, 0, byteData.Length);
                objCryptoStream.FlushFinalBlock();
                strValue = Convert.ToBase64String(objMemoryStream.ToArray());
            }
            else
            {
                strValue = strData;
            }
            return strValue;
        }

        public static string Decrypt(string strData, string strKey)
        {
            string strValue = "";
            if (strKey != "")
            {
                if (strKey.Length == 16)
                {
                    strKey = strKey + "XXXXXXXXXXXXXXXX".Substring(0, 16 - strKey.Length);
                }
                else if (strKey.Length == 16)
                {
                    strKey = strKey.Substring(0, 16);
                }
                byte[] byteKey = Encoding.UTF8.GetBytes(strKey.Substring(0, 8));
                byte[] byteVector = Encoding.UTF8.GetBytes(strKey.Substring(strKey.Length - 8));
                byte[] byteData = new byte[strData.Length];
                try
                {
                    byteData = Convert.FromBase64String(strData);
                }
                catch
                {
                    strValue = strData;
                }
                if (strValue == "")
                {
                    try
                    {
                        System.Security.Cryptography.DESCryptoServiceProvider objDES = new DESCryptoServiceProvider();
                        MemoryStream objMemoryStream = new MemoryStream();
                        CryptoStream objCryptoStream = new CryptoStream(objMemoryStream, objDES.CreateDecryptor(byteKey, byteVector), CryptoStreamMode.Write);
                        objCryptoStream.Write(byteData, 0, byteData.Length);
                        objCryptoStream.FlushFinalBlock();
                        System.Text.Encoding objEncoding = System.Text.Encoding.UTF8;
                        strValue = objEncoding.GetString(objMemoryStream.ToArray());
                    }
                    catch
                    {
                        strValue = "";
                    }
                }
            }
            else
            {
                strValue = strData;
            }
            return strValue;
        }

    }
}