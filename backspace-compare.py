class Solution(object):
  def backspaceCompare(self, S, T):
    """
    :type S: str
    :type T: str
    :rtype: bool
    """
    p1, p2 = len(S) - 1, len(T) - 1

    while p1 >= 0 or p2 >= 0:
      p1, p2 = self.find_next_letter(S, p1), self.find_next_letter(T, p2)

      if S[p1] != T[p2]: return False

    return True

  def find_next_letter(self, string, pointer):
    num_backspaces = 0

    while pointer >= 0:
      char = string[pointer]
      if char == '#':
        num_backspaces += 1
      elif num_backspaces == 0:
        return pointer - 1
      else:
        num_backspaces -= 1
        
      pointer -= 1

      return None
