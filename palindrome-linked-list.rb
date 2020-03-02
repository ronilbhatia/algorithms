# Did this on my phone in Ruby 
def is_palindrome(head)
    list = []

    curr = head    
    while (curr)
        list << curr.val
        curr = curr.next
    end
    
    right = list.length / 2
    left = right - 1
    right += 1 if list.length % 2 != 0
    
    while left >= 0
        return false if list[left] != list[right]
        left -= 1
        right += 1
    end
    
    true
end