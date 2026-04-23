package com.fms.tickets.controller;

import com.fms.common.ApiResponse;
import com.fms.tickets.model.Ticket;
import com.fms.tickets.service.TicketService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TicketController {

    private final TicketService ticketService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<Ticket>> createTicket(
            @RequestParam("title") @NotBlank @Size(min = 3, max = 100) String title,
            @RequestParam("description") @NotBlank @Size(min = 10, max = 1000) String description,
            @RequestParam("category") @NotBlank String category,
            @RequestParam("priority") @Pattern(regexp = "^(LOW|MEDIUM|HIGH|URGENT)$") String priority,
            @RequestParam("submittedBy") @Email @NotBlank String submittedBy,
            @RequestParam("contactNumber") @Pattern(regexp = "^[+]?[0-9]{10,15}$") @NotBlank String contactNumber,
            @RequestParam("location") @NotBlank String location,
            @RequestPart(value = "images", required = false) MultipartFile[] images) {
        
        // Create ticket object with default status
        Ticket ticket = new Ticket();
        ticket.setTitle(title);
        ticket.setDescription(description);
        ticket.setCategory(category);
        ticket.setPriority(priority);
        ticket.setStatus("OPEN"); // Set default status
        ticket.setSubmittedBy(submittedBy);
        ticket.setContactNumber(contactNumber);
        ticket.setLocation(location);
        
        ApiResponse<Ticket> response = ticketService.createTicket(ticket, images);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Ticket>>> getAllTickets() {
        ApiResponse<List<Ticket>> response = ticketService.getAllTickets();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Ticket>> getTicketById(@PathVariable String id) {
        ApiResponse<Ticket> response = ticketService.getTicketById(id);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Ticket>> updateTicket(
            @PathVariable String id, 
            @Valid @RequestBody Ticket ticket) {
        ApiResponse<Ticket> response = ticketService.updateTicket(id, ticket);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{id}/assign")
    public ResponseEntity<ApiResponse<Ticket>> assignTicket(
            @PathVariable String id,
            @RequestBody String technicianEmail) {
        ApiResponse<Ticket> response = ticketService.assignTicket(id, technicianEmail);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{id}/resolve")
    public ResponseEntity<ApiResponse<Ticket>> resolveTicket(
            @PathVariable String id,
            @RequestBody String resolutionNotes) {
        ApiResponse<Ticket> response = ticketService.resolveTicket(id, resolutionNotes);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<ApiResponse<Ticket>> rejectTicket(
            @PathVariable String id,
            @RequestBody String rejectionReason) {
        ApiResponse<Ticket> response = ticketService.rejectTicket(id, rejectionReason);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTicket(@PathVariable String id) {
        ApiResponse<Void> response = ticketService.deleteTicket(id);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse<List<Ticket>>> getTicketsByStatus(@PathVariable String status) {
        ApiResponse<List<Ticket>> response = ticketService.getTicketsByStatus(status);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/priority/{priority}")
    public ResponseEntity<ApiResponse<List<Ticket>>> getTicketsByPriority(@PathVariable String priority) {
        ApiResponse<List<Ticket>> response = ticketService.getTicketsByPriority(priority);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse<List<Ticket>>> getTicketsByCategory(@PathVariable String category) {
        ApiResponse<List<Ticket>> response = ticketService.getTicketsByCategory(category);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Ticket>>> searchTickets(@RequestParam String keyword) {
        ApiResponse<List<Ticket>> response = ticketService.searchTickets(keyword);
        return ResponseEntity.ok(response);
    }
}
