using System;
using System.Collections.Generic;
using System.Text;

namespace CommonCodes.ExtensionMethods
{
    public static class Extensions
    {
        public static string AsPropertyName(this string source)
        {
            return char.ToUpper(source[0]) + source.Substring(1);
        }
    }
}
