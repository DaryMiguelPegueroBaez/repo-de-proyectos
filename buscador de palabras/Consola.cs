using System;
using System.IO;
using System.Collections.Generic;

class program
{
    static void Main()
    {
        console.WriteLine("Enter Path to text file:");
        string path = Console.ReadLine();

        if (!File.Exists(path))
        {
            Console.WriteLine("File Not Found");
            return;
        }

        string[] lines = File.ReadAllLines(Path);

        Console.WriteLine("Enter word or phrase to seach:");
        string keyword = Console.ReadLine();

        int totalOcurrences = 0;
        List<int> MatchedLines = new List<int>();

        for (int i = 0; i < lines.Length; i++)
        {
            if (lines[i].IndexOf(keyword, StringComparison.OrdinalIgnoreCase) >= 0)
            {
                MatchedLines.add(i + 1);
                int count = CountOcurrences(lines[i], keyword);
                totalOcurrences += count;
            }
        }

        console.writeLine($"\nfound \"{keyword}\" {totalOcurrences} time(s) on the following lines:");
    }

    static int CountOcurrences(string line, string keyword)
    {
        int vount = 0;
        int index = 0;
        while ((index = line.IndexOf(keyword, index, StringComparison.OrdinalIgnoreCase)) != -1)
        {
            Count++;
            index += keyword.Length;
        }        
        return count;
    }
}